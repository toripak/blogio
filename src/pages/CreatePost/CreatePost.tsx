import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { readingTimeInMinutes } from "../../utils/readingTime";
import MarkdownEditor from "@uiw/react-markdown-editor";

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [postContent, setPostContent] = useState('');

  const { user } = useAuthContext();
  const { addDocument, firestoreRes } = useFirestore('posts');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postedBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const readingTime = readingTimeInMinutes(postContent);

    const post = {
      title,
      tags: tags,
      postContent,
      postedBy,
      comments: [],
      likes: 0,
      readingTime,
      modifiedAt: '',
    }

    await addDocument(post);
    if (!firestoreRes.error) {
      navigate('/');
    }
  }

  return (
    <div className="container flex justify-center">
      <form
        className="flex w-full lg:w-5/6 flex-col m-4 border border-gray-100 rounded bg-white shadow-md"
        onSubmit={handleSubmit}
      >
        <label
          className="px-2 m-3 mt-5 "
        >
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="placeholder:font-bold w-full outline-none font-bold text-xl"
            type="text"
            placeholder="New post title here..."
            autoFocus
          />
        </label>
        <label
          className="px-2 m-3 "
        >
          <input
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="placeholder:font-mono italic w-full outline-none"
            type="text"
            placeholder="Add up to 5 comma-separated tags..."
          />
        </label>
        <label
          className="px-2 m-3 "
        >
          <MarkdownEditor
            value={postContent}
            onChange={(value: string) => setPostContent(value)}
            className="placeholder:font-mono w-full outline-none min-h-20"
            visible={true}
            visibleEditor={true}
          />
        </label>
        <button
          className="btn-secondary ml-5 my-4"
        >
          Publish
        </button>

      </form>
    </div>
  )
}

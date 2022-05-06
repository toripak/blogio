import { useAuthContext } from "../hooks/useAuthContext"
import React, { useEffect, useState } from "react";
import { timestamp } from "../firebase/firebase-config";
import { DocumentData, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { useNavigate } from "react-router-dom";

type Props = {
  post: DocumentData
}

export const CreateComment: React.FC<Props> = ({ post }) => {
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState<string>('');
  const [commentsCount, setCommentsCount] = useState(() => post?.comments.length)

  const navigate = useNavigate();

  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    content: commentText,
    createdAt: timestamp.fromDate(new Date()),
    id: `${user.uid.slice(0, 5)}-${new Date().getTime()}`,
    userID: user.uid
  }

  const handleCommentClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    const collectionRef = doc(db, 'posts', post.id);

    await updateDoc(collectionRef, {
      comments: [...post.comments, newComment]
    })
    setCommentText('');
    navigate(`/posts/${post.id}`);
  }

  useEffect(() => {
    setCommentsCount(post.comments.length)
  })

  return (
    <div className="container-md m-2 flex flex-col items-center">
      <div className="m-1 p-2 flex flex-col lg:w-5/6 justify-between w-full border border-gray-100 backdrop-blur-md rounded shadow-sm bg-white/50">
        <form onSubmit={handleCommentClick}>
          <h2 className="font-bold text-lg">Discussion ({0 || post?.comments.length}) </h2>
          <textarea
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="my-2 placeholder:italic w-full outline-none p-2"
            placeholder="Share your thoughts!"
            autoFocus
          ></textarea>

          <button

            className=" p-2 w-24 tracking-wide text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition ease-in active:scale-95 rounded"
          >
            Publish
          </button>

        </form>
      </div>
    </div>
  )
}

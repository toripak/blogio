import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineModeComment } from 'react-icons/md';
import { db } from '../firebase/firebase-config';
import { useAuthContext } from '../hooks/useAuthContext';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useFirestore } from '../hooks/useFirestore';
import { EditPost } from './EditPost';

type Props = {
  post: DocumentData;
  showPostContent: Boolean;
}

export const Post: React.FC<Props> = ({ post, showPostContent }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const { deleteDocument, firestoreRes } = useFirestore('posts');

  const handleEditClick = (e: React.SyntheticEvent) => {
    setUpdating(updating => !updating);
    navigate(`/posts/${post.id}`);
  }

  const handleDeleteClick = () => {
    deleteDocument(post.id);

    if (!firestoreRes) {
      navigate('/')
    }
  }

  const postedAt = post.createdAt.toDate().toLocaleDateString('gb', { dateStyle: 'medium' });
  const tags = post.tags.split(',').map((tag: string) => <p key={tag} className='my-1 p-1 hover:bg-indigo-100/70 rounded'>#{tag.trim()}</p>);

  const handleLikeClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLiked(notLiked => !notLiked);
    const postRef = doc(db, 'posts', post.id);
    const newLikes = !liked ? post.likes += 1 : post.likes -= 1;

    await updateDoc(postRef, {
      likes: newLikes
    })
  }

  const handleCommentClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/posts/${post.id}`)
  }

  return (
    <div className='container-md m-2 flex flex-col items-center'>
      {post && (
        <div className='m-1 p-2 flex flex-col lg:w-5/6 justify-between w-full border border-gray-100 backdrop-blur-md rounded shadow-sm bg-white/50 '>
          <div
            className='flex items-center mb-2 -ml-1'>
            <Avatar img={post.postedBy.photoURL} id={post.postedBy.id} />
            <div className='px-3 text-xs'>
              <p className='font-bold text-sm'>{post.postedBy.displayName}</p>
              <p>Posted on {postedAt}</p>
            </div>
          </div>

          {user?.uid === post.postedBy.id && <div className='absolute self-top self-end'>
            <button onClick={handleEditClick} className='px-1'>
              <AiOutlineEdit size={18} color='#5A67D8' />
            </button>
            <button onClick={handleDeleteClick}>
              <AiOutlineDelete size={18} color='#E53E3E' />
            </button>
          </div>}

          <Link to={`/posts/${post.id}`} className='m-1 ml-14 pl-1'>
            <h2 className='text-xl font-bold hover:text-indigo-700'>{post.title}</h2>
            <div className='flex text-sm -ml-1'>{tags}</div>

            {showPostContent && (
              <div className='my-1 mb-2'>
                <p>{post.postContent}</p>
              </div>)}

            {updating && <EditPost
              id={post.id}
              updating={updating}
              setUpdating={setUpdating}
            />}

            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center'>
                <button
                  className='active:scale-110 p-1 -ml-1 hover:bg-indigo-100 rounded-full'
                  onClick={handleLikeClick}
                >
                  <AiOutlineLike
                    color='#4C51BF'
                    size={18}
                  />
                </button>
                <span className='pl-1'>{post.likes} </span>

                <button
                  className='active:scale-110 p-1 ml-2 hover:bg-indigo-100 rounded-full'
                  onClick={handleCommentClick}>
                  <MdOutlineModeComment color='#4C51BF' size={18} />
                </button>
                <span className='pl-1'>{post.comments.length} </span>
              </div>

              <p className='text-xs'>{post.readingTime} min read</p>

            </div>
          </Link>
        </div >
      )}
    </div >
  )
}

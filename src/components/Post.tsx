import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineModeComment } from 'react-icons/md';
import { db } from '../firebase/firebase-config';
import { useAuthContext } from '../hooks/useAuthContext';

type Props = {
  post: DocumentData
}

export const Post: React.FC<Props> = ({ post }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const postedAt = post.createdAt.toDate().toLocaleDateString('gb', { dateStyle: 'medium' });
  const tags = post.tags.split(',').map((tag: string) => <p key={tag} className='my-1 p-1 hover:bg-indigo-100/70 rounded'>#{tag.trim()}</p>);

  const handleLikeClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    }

    setLiked(prev => !prev);
    const collectionRef = doc(db, 'posts', post.id);
    const newLikes = !liked ? post.likes += 1 : post.likes -= 1;
    console.log(newLikes)

    await updateDoc(collectionRef, {
      likes: newLikes
    })
  }

  const handleCommentClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/posts/${post.id}`)
  }


  return (
    <div className='container-md m-2 flex flex-col items-center'>
      <div className='m-1 p-2 flex flex-col lg:w-5/6 justify-between w-full border border-gray-100 backdrop-blur-md rounded shadow-sm bg-white/40 '>
        <div
          className='flex items-center mb-2 -ml-1'>
          <Avatar img={post.postedBy.photoURL} id={post.postedBy.id} />
          <div className='px-3 text-xs'>
            <p className='font-bold text-sm'>{post.postedBy.displayName}</p>
            <p>Posted on {postedAt}</p>
          </div>
        </div>

        <Link to={`/posts/${post.id}`} className='m-1 ml-14 pl-1'>
          <h2 className='text-xl font-bold hover:text-indigo-700'>{post.title}</h2>
          <div className='flex text-sm -ml-1'>{tags}</div>

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
      </div>
    </div >
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Comment } from '../utils/types';
import { Avatar } from './Avatar';

type Props = {
  comments: Comment[]
}

export const PostComments: React.FC<Props> = ({ comments }) => {
  const { user } = useAuthContext();

  return (
    <div>
      {comments.length > 0 && (
        <div className="container-md m-2 flex flex-col items-center">
          {!user && (
            <div className='my-2 flex flex-col items-center'>
              <h2 className='font-bold '>Comments ({comments.length}) </h2>
              <p className='italic text-sm'>Please <Link to='/login' className='text-blue-600 underline'>log in</Link>  to leave comments</p>
            </div>)}

          {comments?.map(comment => {
            return (
              <div
                key={`${comment.createdAt}-${comment.userID}`}
                className="m-1 p-2 flex flex-col lg:w-5/6 justify-between w-full border border-gray-100 backdrop-blur-md rounded shadow-sm bg-white/50"
              >
                <div
                  className='flex flex-col justify-center m-2 border border-gray-200 rounded'>
                  <div className='flex items-center p-1'>
                    <Avatar img={comment.photoURL} id={comment.userID} />
                    <div className='px-3 text-xs'>
                      <p className='font-bold text-sm'>{comment.displayName}</p>
                      <p>Posted on {comment.createdAt.toDate().toLocaleDateString('gb', { dateStyle: 'medium' })}</p>
                    </div>
                  </div>
                  <div className='m-2 pl-2'>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase/firebase-config';

type Props = {
  id: string;
  updating: boolean;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPost: React.FC<Props> = ({ id, updating, setUpdating }) => {
  const [newPostContent, setNewPostContent] = useState('');

  const handleSubmitChange = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      postContent: newPostContent
    })

    setUpdating(false);
  }

  return (
    <div>
      {updating && (
        <>
          <label>
            <textarea
              className='w-full p-2'
              name={newPostContent}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            >
            </textarea>
          </label>
          <button
            onClick={handleSubmitChange}
            className="my-2 p-2 w-24 tracking-wide text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition ease-in active:scale-95 rounded"
          >
            Submit</button>
        </>
      )}
    </div>
  )
}


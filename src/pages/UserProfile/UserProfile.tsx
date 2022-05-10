import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const { uid } = useParams<{ uid?: string }>();
  let photoURL: string | undefined;

  return (
    <div className='container-md m-3 flex rounded flex-col items-center'>
      {/* <img
        className='w-full h-48 2xl:h-56 shadow-md opacity-50 rounded object-cover'
        src={'https://source.unsplash.com/random/?sky,pastel'}
        alt="banner"
      />
      {photoURL && <img
        className='w-12 h-12 ml-2 rounded-full hover:shadow-md transition ease-in-out object-cover '
        src={photoURL}
        alt="user avatar"
      />} */}
      User Profile / in progress

    </div>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../utils/types';

interface IProps {
  img: string;
  user: User
}

export const Avatar: React.FC<IProps> = ({ img, user }) => {
  return (
    <>
      <Link to={`user-profile/${user?.uid}`}>
        <img
          className='w-12 h-12 rounded-full object-cover'
          src={img}
          alt="user avatar" />
      </Link>
    </>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  img: string;
  id: string
}

export const Avatar: React.FC<Props> = ({ img, id }) => {
  return (
    <>
      <Link to={`/user-profile/${id}`} className='min-w-fit'>
        <img
          className='w-12 h-12 ml-2 rounded-full hover:shadow-md transition ease-in-out object-cover '
          src={img}
          alt="user avatar" />
      </Link>
    </>
  )
}

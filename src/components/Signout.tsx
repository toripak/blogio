import React from 'react';
import { useSignOut } from '../hooks/useSignOut';
import { BiExit } from 'react-icons/bi';

export const Signout = () => {
  const { signout, error, loading } = useSignOut();

  const handleClick = () => {
    signout();
  }

  return (
    <div>
      <BiExit
        onClick={handleClick}
        className='ml-2 hover:scale-110 active:scale-105 transition ease-in cursor-pointer'
        color='#E53E3E'
        size={23}
      />
    </div>
  )
}

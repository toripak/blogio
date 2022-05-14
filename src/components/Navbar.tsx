import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Avatar } from './Avatar';
import { Signout } from './Signout';

export const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className='z-10 flex flex-1 justify-center sticky top-0 shadow-sm w-full p-3 items-center backdrop-blur-sm bg-white/80'>
      <div className='flex lg:w-5/6 w-full min-w-10 justify-between'>
        <Link to='/'>
          <span className='font-mono hover:translate-y-1 cursor-pointer text-3xl font-bold'>b.</span>
          <p className='text-gray-600 font-mono text-xs cursor-pointer'>blogio</p>
        </Link >
        <div className='flex items-center font-mono text-sm'>
          {!user && <NavLink to='login' className='btn-secondary text-center'>Log in</NavLink >}
          {!user && <NavLink to='signup' className='pl-3 text-blue-600'>Sign up</NavLink >}
          {user && <Link to='createpost' className='text-center text-sm p-2 m-1 text-indigo-600 border border-indigo-500 tracking-wide hover:bg-indigo-500 active:scale-95 transition ease-in hover:text-white rounded font-bold'>Create Post</Link>}
          {user && <Avatar img={user.photoURL} id={user.uid} />}
          {user && <Signout />}
        </div>
      </div>
    </nav>
  )
}

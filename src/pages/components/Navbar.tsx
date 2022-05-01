import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { UserProfile } from '../UserProfile/UserProfile';
import { Avatar } from './Avatar';

export const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className='z-10 flex justify-between sticky top-0 shadow-sm w-full px-4 py-3 items-center backdrop-blur-sm bg-white/60'>
      <NavLink to='/'>
        <span className='font-mono  hover:translate-y-1 cursor-pointer text-3xl font-bold'>b.</span>
        <p className='text-gray-600 font-mono text-xs cursor-pointer'>blogio</p>
      </NavLink >
      <div className='flex items-center font-mono text-xs'>
        {!user && <NavLink to='login' className='pl-3'>Log in</NavLink >}
        {!user && <NavLink to='signup' className='pl-3'>Sign up</NavLink >}
        {user && <Link to='createpost' className='text-center text-sm p-2 m-2 text-indigo-600 border border-indigo-500 tracking-wide hover:bg-indigo-500 active:scale-95 transition ease-in hover:text-white rounded font-bold'>Create Post</Link>}
        {user && <Avatar img={user.photoURL} user={user} />}
      </div>
    </nav>
  )
}

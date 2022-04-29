import {NavLink} from 'react-router-dom';
import { UserProfile } from '../UserProfile/UserProfile';

export const Navbar = () => {
  return (
    <nav className='flex justify-between sticky top-0 shadow-sm w-full p-4 items-center backdrop-blur-sm bg-white/40'>
      <NavLink to='/'>
        <span className='font-mono hover:translate-y-1 transition ease-in-out cursor-pointer duration-100 text-3xl font-bold'>b.</span>
        <p className='text-gray-600 font-mono text-xs cursor-pointer'>blogio</p>
      </NavLink >
      <div className='font-mono text-xs'>
        <NavLink to='login' className='pl-3'>Log in</NavLink >
        <NavLink to='signup' className='pl-3'>Sign up</NavLink >
      </div>
    </nav>
  )
}

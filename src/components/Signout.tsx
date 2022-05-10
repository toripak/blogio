import { useNavigate } from 'react-router-dom';
import { useSignOut } from '../hooks/useSignOut';
import { BiExit } from 'react-icons/bi';

export const Signout = () => {
  const { signout, error } = useSignOut();
  const navigate = useNavigate();

  const handleClick = () => {
    signout();
    navigate('/')
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

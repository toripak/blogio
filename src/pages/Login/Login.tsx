import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { useLogin } from '../../hooks/useLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, loading } = useLogin();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className='flex mt-4 mx-2 justify-center items-center flex-col'>
      <form
        className='container p-2 m-3 min-w-fit backdrop-blur-xl bg-white/40 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 shadow-md rounded'
        onSubmit={handleSubmit}
      >
        <h2 className='mt-3 font-bold text-lg'>Log in</h2>

        <label
          className='p-2'
        >
          <input
            autoFocus
            type="email"
            required
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='p-2 w-60 border border-grey-light rounded max-w-xs'
          />
        </label>
        <label
          className='p-2'
        >
          <input
            type="password"
            required
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 w-60 border border-grey-light rounded max-w-xs'
          />
        </label>

        {!loading && (
          <button
            className='btn-primary'
          >
            Log in
          </button>
        )}

        {loading && (
          <button
            disabled
            className='btn-primary'
          >
            Log in
          </button>
        )}

        {error && (
          <p
            className='text-red-500 mt-2 mb-4'
          >
            {error}
          </p>
        )}

      </form>

      <div>
        <span>Don't have an account yet?</span>
        {" "}
        <Link to='/signup'><span className='text-blue-600 underline'>Sign up</span></Link>
      </div>
    </div>
  )
}

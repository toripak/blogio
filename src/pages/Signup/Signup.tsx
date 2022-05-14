import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { useSignup } from '../../hooks/useSignup';
import { auth } from '../../firebase/firebase-config';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [icon, setIcon] = useState<any>(null);
  const [iconError, setIconError] = useState('');

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(email, password, displayName, icon);
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(null);

    let file = e.target.files?.[0];

    if (!file) {
      setIconError('Please select a file')
      return
    }
    if (!file?.type.includes('image')) {
      setIconError('File type must be an image')
      return
    }
    if (file?.size > 81000) {
      setIconError('File size should be less than 80kb')
      return
    }

    setIconError('');
    setIcon(file);
  }

  return (
    <div className='flex mt-4 mx-2 justify-center items-center flex-col'>
      <form
        className='container min-w-fit p-2 m-3 backdrop-blur-xl bg-white/40 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 shadow-md rounded'
        onSubmit={handleSubmit}
      >
        <h2 className='mt-3 font-bold text-lg'>Sign up</h2>
        <label
          className='p-3'
        >
          <input
            autoFocus
            type="text"
            required
            value={displayName}
            placeholder='Display Name'
            onChange={(e) => setDisplayName(e.target.value)}
            className='p-2 border border-grey-light w-full rounded'
          />
        </label>
        <label
          className='p-2'
        >
          <input
            type="email"
            required
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='p-2 border border-grey-light w-full rounded'
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
            className='p-2 border border-grey-light rounded'
          />
        </label>
        <label
          className='p-2'
        >
          <p className='text-center text-sm'>Profile avatar:</p>
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleIconUpload}
            className='text-sm p-2 border border-grey-light w-60 rounded'
          />
        </label>
        {iconError && <p className='m-2 border text-center w-60 text-sm bg-red-50 text-red-500 border-red-300 rounded p-1'>{iconError}</p>}
        {!isLoading && <button
          className='text-white tracking-wider text-lg rounded font-bold w-60 text-center bg-gradient-to-br from-blue-400 to-purple-400 active:translate-y-1 mt-2 mb-4 p-2'
        >Create Account
        </button>}
        {isLoading && <button disabled
          className='btn-primary'
        >Loading...
        </button>}
        {error && <p className='my-2 text-red-600'>{error}</p>}
      </form>

      <div>
        <span>Already have an account?</span>
        {" "}
        <Link to='/login'><span className='text-blue-600 underline'>Log in</span></Link>
      </div>
    </div>
  )
}

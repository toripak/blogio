import { useState } from 'react';
import { auth, storage } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, displayName: string, icon: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (!userCredential) {
        throw new Error('Signup could not be completed...')
      }

      // upload user icon
      const iconRef = ref(storage, `icons/${userCredential.user.uid}/${icon.name}`);
      const iconSnapshot = await uploadBytes(iconRef, icon);

      const photoURL = await getDownloadURL(iconRef);

      await updateProfile(userCredential.user, { displayName, photoURL });
      console.log(userCredential.user)

      dispatch({ type: 'LOGIN', payload: userCredential.user });

      setIsLoading(false);
      setError(null);
    }
    catch (error: any) {
      console.log(error?.message);
      setError(error.message);
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error }
}

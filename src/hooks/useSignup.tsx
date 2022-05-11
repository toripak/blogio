import { useState } from 'react';
import { auth, db, storage } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

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
      const iconRef = ref(storage, `icons/${userCredential.user.uid}`);
      const iconSnapshot = await uploadBytes(iconRef, icon);

      const photoURL = await getDownloadURL(iconRef);

      await updateProfile(userCredential.user, { displayName, photoURL });
      dispatch({ type: 'LOGIN', payload: userCredential.user });

      const newUser = {
        id: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      }
      await setDoc(doc(db, 'users', `${newUser.id}`), newUser);

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

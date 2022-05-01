import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch({ type: 'LOGIN', payload: user });
      console.log(user);

      setLoading(false);
      setError(null);
    }
    catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setLoading(false)
    }
  }
  return { login, error, loading };
}
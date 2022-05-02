import { useState } from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { dispatch } = useAuthContext();

  const signout = async () => {
    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });

      setLoading(false);
      setError(null);
    }
    catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  }

  return { signout, error, loading };
}

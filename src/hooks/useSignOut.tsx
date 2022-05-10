import { useState } from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const signout = async () => {
    setError(null);

    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });

      setError(null);
    }
    catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return { signout, error };
}

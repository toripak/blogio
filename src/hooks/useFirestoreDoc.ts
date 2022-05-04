import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';

export const useFirestoreDoc = (col: string, id?: string) => {
  const [document, setDocument] = useState<DocumentData | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, col, id);

      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.data()) {
            console.log('Doc data:', docSnap.data());
            setDocument({ ...docSnap.data, id: docSnap.id });
          } else {
            console.log(docSnap.data());
            setError('We\'re sorry... No such document exists')
          }
        })
    }

  }, [col, id])

  return { document, error };
}

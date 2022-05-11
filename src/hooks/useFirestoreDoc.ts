import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';

export const useFirestoreDoc = (col: string, id?: string) => {
  const [document, setDocument] = useState<DocumentData | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, col, id);

      onSnapshot(docRef, (doc) => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id });
        } else {
          console.log(doc.data());
          setError('We\'re sorry... No such document exists')
        }
      })
    }

  }, [col, id])

  return { document, error };
}

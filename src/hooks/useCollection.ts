import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';
import { collection, onSnapshot, query, where, orderBy, DocumentData } from 'firebase/firestore';
import { q, _orderBy } from '../utils/types';

export const useCollection = (col: string, q?: q, _orderBy?: _orderBy) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = collection(db, col);
    let firebaseQuery = query(ref);

    if (q) {
      firebaseQuery = query(ref, where(...q))
    };
    if (_orderBy) {
      firebaseQuery = query(ref, orderBy(..._orderBy))
    };

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results: DocumentData[] = [];
      snapshot.docs.forEach(document => {
        results.push({ ...document.data(), id: document.id })
      })
      setPosts(results);
      setError(null);
    })

    return () => unsubscribe()

  }, [col, q, _orderBy])

  return { posts, error }
}

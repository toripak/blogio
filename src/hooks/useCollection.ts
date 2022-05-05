import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/firebase-config';
import { collection, onSnapshot, query, where, orderBy, DocumentData } from 'firebase/firestore';
import { q, _orderBy } from '../utils/types';

export const useCollection = (col: string, q?: q, _orderBy?: _orderBy) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState(null);

  // wrap _query & _orderBy :array in useRef in order to prevent re-rendering when updated
  const originalQuery = useRef(q).current;
  const orderByQuery = useRef(_orderBy).current;

  useEffect(() => {
    const collectionRef = collection(db, col);
    let firebaseQuery = query(collectionRef);

    if (originalQuery) {
      firebaseQuery = query(collectionRef, where(...originalQuery))
    };
    if (orderByQuery) {
      firebaseQuery = query(collectionRef, orderBy(...orderByQuery))
    };

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let results: DocumentData[] = [];
      snapshot.docs.forEach(document => {
        results.push({ ...document.data(), id: document.id })
      })
      setPosts(results);
      setError(null);
    })

    return () => unsubscribe()

  }, [col, originalQuery, orderByQuery])

  return { posts, error }
}

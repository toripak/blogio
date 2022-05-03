import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Reducer, useReducer } from 'react';
import { db, timestamp } from '../firebase/firebase-config';
import { InitialStateType } from '../utils/interfaces';
import { Action } from '../utils/types';

let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null
}

const firestoreReducer = (state: InitialStateType, action: Action): InitialStateType => {
  const { type, payload } = action;
  switch (type) {
    case 'IS_LOADING':
      return { isLoading: true, document: null, success: false, error: null };
    case 'NEW_DOCUMENT':
      return { isLoading: false, document: payload, success: true, error: null };
    case 'ERROR':
      return { isLoading: false, document: null, success: false, error: payload };
    case 'DELETED_DOCUMENT':
      return { isLoading: false, document: null, success: true, error: null };
    default:
      return { isLoading: false, document: null, success: false, error: `Unknown action type: ${type}` }
  }
}

export const useFirestore = (col: string) => {
  const [firestoreRes, dispatch] = useReducer<Reducer<InitialStateType, Action>>(firestoreReducer, initialState);

  const collectionRef = collection(db, col);

  const addDocument = async (document: any) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const newDocument = await addDoc(collectionRef, { ...document, createdAt });
      dispatch({ type: 'NEW_DOCUMENT', payload: newDocument });
    }
    catch (error: any) {
      dispatch({ type: 'ERROR', payload: error.message })
    }
  }

  const deleteDocument = async (id: string) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      await deleteDoc(doc(collectionRef, id));
      dispatch({ type: 'DELETED_DOCUMENT' })
    }
    catch (error: any) {
      dispatch({ type: 'ERROR', payload: error.message })
    }
  }

  return { addDocument, deleteDocument, firestoreRes };
}
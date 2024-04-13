// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCCVSgzf1zTFkczDi9lS-0TAEtRAR3oHy0',
  authDomain: 'chatonline-ade66.firebaseapp.com',
  projectId: 'chatonline-ade66',
  storageBucket: 'chatonline-ade66.appspot.com',
  messagingSenderId: '107654617676',
  appId: '1:107654617676:web:82362ed29e19d488eab2e9',
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, auth, firestore, storage };

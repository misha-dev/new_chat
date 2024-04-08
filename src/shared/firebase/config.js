import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCCVSgzf1zTFkczDi9lS-0TAEtRAR3oHy0',
  authDomain: 'chatonline-ade66.firebaseapp.com',
  projectId: 'chatonline-ade66',
  storageBucket: 'chatonline-ade66.appspot.com',
  messagingSenderId: '107654617676',
  appId: '1:107654617676:web:82362ed29e19d488eab2e9',
};

// init firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

export { auth, firebase, firestore };

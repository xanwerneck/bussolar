import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xx",
    appId: "xxx"
};

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase  = firebase.firestore();
export const firebaseAuth = firebase.auth()
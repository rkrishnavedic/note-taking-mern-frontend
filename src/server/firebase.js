import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyD2QgbMt47kO_HFYXclK3NNDxfCMPZYF9Q",
    authDomain: "evernote-clone-5ac22.firebaseapp.com",
    projectId: "evernote-clone-5ac22",
    storageBucket: "evernote-clone-5ac22.appspot.com",
    messagingSenderId: "930457688331",
    appId: "1:930457688331:web:2a4327a1ea12fc2e20aa0e"
  };
  // Initialize Firebase
const fireBase = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default fireBase;
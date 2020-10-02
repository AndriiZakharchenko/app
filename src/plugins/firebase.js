import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'film-library-92d9c.firebaseapp.com',
  databaseURL: 'https://film-library-92d9c.firebaseio.com',
  projectId: 'film-library-92d9c',
  storageBucket: 'film-library-92d9c.appspot.com',
  messagingSenderId: '711120086311',
  appId: '1:711120086311:web:25e93287e1b35404437502',
});

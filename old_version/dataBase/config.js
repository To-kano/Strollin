import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCplC9tNh6nu5a4IW_6CPwSGKTGJ1q-CIY',
  authDomain: 'testdatareactnative.firebaseapp.com',
  databaseURL: 'https://testdatareactnative.firebaseio.com',
  projectId: 'testdatareactnative',
  storageBucket: 'testdatareactnative.appspot.com',
  messagingSenderId: '110522901090',
  appId: '1:110522901090:web:44a430f392a3c98399673b',
  measurementId: 'G-K1DM36HKBV'

};

const app = Firebase.initializeApp(config);

export const fire = app;

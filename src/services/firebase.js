import * as firebase from 'firebase';
import '@firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCrmPf0KBh4nwnsjum9Vrg32AdO0R7tXD0",
  authDomain: "choppers-43440.firebaseapp.com",
  databaseURL: "https://choppers-43440.firebaseio.com",
  projectId: "choppers-43440",
  storageBucket: "choppers-43440.appspot.com",
  messagingSenderId: "140644361621",
  appId: "1:140644361621:web:dbf42f0c7ac8d1d5bf029c",
  measurementId: "G-RMX10SCL60"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
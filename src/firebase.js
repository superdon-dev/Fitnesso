import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBKNXjQsCHm5JeDq6FiYK-8hWZaWKh8Oeg",
    authDomain: "react-fitnesso.firebaseapp.com",
    databaseURL: "https://react-fitnesso.firebaseio.com",
    projectId: "react-fitnesso",
    storageBucket: "react-fitnesso.appspot.com",
    messagingSenderId: "601490369388",
    appId: "1:601490369388:web:63dfd015da35dfaf82e149",
    measurementId: "G-E11BFYGHVB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
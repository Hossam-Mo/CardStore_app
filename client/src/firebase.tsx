import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCgvacOwHJxTKGZLqqjn3KTckyEAhKkQkU",
  authDomain: "yasserproject-826dd.firebaseapp.com",
  projectId: "yasserproject-826dd",
  storageBucket: "yasserproject-826dd.appspot.com",
  messagingSenderId: "940656393374",
  appId: "1:940656393374:web:be1bf491e01e35eaf28f8f",
  measurementId: "G-6V8ZPDF0SQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, googleProvider };

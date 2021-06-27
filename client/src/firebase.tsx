import firebase from "firebase";

/* const firebaseConfig = {
  apiKey: "AIzaSyCgvacOwHJxTKGZLqqjn3KTckyEAhKkQkU",
  authDomain: "yasserproject-826dd.firebaseapp.com",
  projectId: "yasserproject-826dd",
  storageBucket: "yasserproject-826dd.appspot.com",
  messagingSenderId: "940656393374",
  appId: "1:940656393374:web:be1bf491e01e35eaf28f8f",
  measurementId: "G-6V8ZPDF0SQ",
}; */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvmzbU1YP0lSTpV2mTwcqNSWgsYFfEQUw",
  authDomain: "cardapp-jos.firebaseapp.com",
  projectId: "cardapp-jos",
  storageBucket: "cardapp-jos.appspot.com",
  messagingSenderId: "938253126099",
  appId: "1:938253126099:web:d777b88b87dccbc3f88726",
  measurementId: "G-0SNML9YKHD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, googleProvider };

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUw5War__mDpAQbkTGa0qFpwP4CENXoaI",
  authDomain: "olx-clone-352f5.firebaseapp.com",
  projectId: "olx-clone-352f5",
  storageBucket: "olx-clone-352f5.appspot.com",
  messagingSenderId: "26470359866",
  appId: "1:26470359866:web:07a1f1204f748d8ee26603",
  measurementId: "G-F3XNHGZ2NP"
};
 export default firebase.initializeApp(firebaseConfig)
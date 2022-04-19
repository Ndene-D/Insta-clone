import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-VVrTYHf9r8ldVBZpOPqASa0KWUBOrWM",
  authDomain: "instagram-clone-fd785.firebaseapp.com",
  projectId: "instagram-clone-fd785",
  storageBucket: "instagram-clone-fd785.appspot.com",
  messagingSenderId: "315311044958",
  appId: "1:315311044958:web:f61c66c459eb31c26b37cf",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, GoogleAuthProvider };

export default db;

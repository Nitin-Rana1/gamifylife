import { initializeApp  } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDc7D7gEdgPovGEmyV4r1MURa5MVhrO9tA",
  authDomain: "dbcollege-dc055.firebaseapp.com",
  projectId: "dbcollege-dc055",
  storageBucket: "dbcollege-dc055.appspot.com",
  messagingSenderId: "174822915843",
  appId: "1:174822915843:web:ac4d0fff7044f7b0083336",
  measurementId: "G-JD8DSYVXLT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db};

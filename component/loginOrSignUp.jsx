import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../fireb/firebApp";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../component/homePage";
import { useState, useEffect } from "react";
import Skills from "../lib/skills";
import styles from "./styles/loginOrSignUp.module.scss";
import {
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

async function createDB(uid, name, email) {
<<<<<<< HEAD
=======
  // Add a new document in collection "cities"
>>>>>>> docid
  try {
    await setDoc(doc(db, "usersData", uid), {
      name: name,
<<<<<<< HEAD
      authId: uid,
=======
>>>>>>> docid
      email: email,
      createdAt: serverTimestamp(),
      skills: Skills,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
//user
function LoginOrSignUp() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  async function logIn() {
    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setuserData(docSnap.data());
    } else {
      console.log("No such document!");
      console.log("creatingDB");
      createDB(
        userCred.user.uid,
        userCred.user.displayName,
        userCred.user.email
      );
    }
  }
  if (loading) {
    return <div className={styles.container2}>Initialising User......</div>;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
  return (
    <div className={styles.container1}>
      <button onClick={logIn}>Log In</button>
    </div>
  );
}
export default LoginOrSignUp;

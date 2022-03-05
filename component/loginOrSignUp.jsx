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
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

async function createDB(uid, name) {
  try {
    const docRef = await addDoc(collection(db, "usersData"), {
      name: name,
      authId: uid,
      createdAt: serverTimestamp(),
      skills: Skills,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
function LoginOrSignUp() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState([]);
  async function logIn() {
    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    const q = query(
      collection(db, "usersData"),
      where("authId", "==", userCred.user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setuserData(data);
    });
    if (userData.length == 0) {
      console.log("creatingDB");
      createDB(userCred.user.uid, userCred.user.displayName);
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

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
import { serverTimestamp, getDoc, doc, setDoc } from "firebase/firestore";
import { Button, ButtonGroup } from "@chakra-ui/react";
async function createDB(uid, name, email, photoURL) {
  try {
    await setDoc(doc(db, "usersData", uid), {
      profilePic: photoURL,
      name: name,
      email: email,
      createdAt: serverTimestamp(),
      skills: Skills,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
function LoginOrSignUp() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  async function logIn() {
    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    const docRef = doc(db, "usersData", userCred.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setuserData(docSnap.data());
    } else {
      createDB(
        userCred.user.uid,
        userCred.user.displayName,
        userCred.user.email,
        userCred.user.photoURL
      );
    }
  }
  if (loading) {
    return (
      <div className={styles.container2}>
        <p>
          <span>
            <img src='./icons/app_icon.png' alt='boy' />
          </span>
          <br />
          <Button
            isLoading
            loadingText='Loading'
            colorScheme='teal'
            variant='outline'
          ></Button>
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>Sorry ):</p>
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

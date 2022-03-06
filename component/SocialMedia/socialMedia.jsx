import styles from "./styles/socialMedia.module.scss";
import { auth, db } from "../../fireb/firebApp";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import AllPosts from "./allPosts";
import { collection, onSnapshot, doc,addDoc, serverTimestamp } from "firebase/firestore";
import { Button, ButtonGroup, Heading } from '@chakra-ui/react'
function SocialMedia() {
  const [postMsg, setPostMsg] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersData", user.uid), (doc) => {
      setuserData({ ...doc.data(), id: doc.id });
    });
  }, []);
  async function post() {
    try {
      await addDoc(collection(db, "messages"), {
        authId: user.uid,
        profilePic: userData.profilePic,
        name: userData.name,
        email: userData.email,
        message: postMsg,
        likes: 0,
        unlikes: 0,
        comments: [],
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.createPost}>
        <input type='text' onChange={(e) => setPostMsg(e.target.value)} />
        <Button onClick={post} colorScheme='pink' variant='solid'>
          Post
        </Button>
      </div>
      <AllPosts />
    </div>
  );
}
export default SocialMedia;

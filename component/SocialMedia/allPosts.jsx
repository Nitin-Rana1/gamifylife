import { db } from "../../fireb/firebApp";
import { useState, useEffect } from "react";
import styles from "../SocialMedia/styles/allPosts.module.scss";
import OnePost from "./onePost";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

function AllPosts() {
  const [postsData, setPostsData] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPostsData(data);
    });
  }, []);
  return (
    <div className={styles.container}>
      {postsData &&
        postsData.map((postData, i) => {
          let millisec = 0;
          if (
            postData.createdAt &&
            postData.createdAt.seconds &&
            postData.createdAt.nanoseconds
          )
            millisec =
              postData.createdAt.seconds * 1000 +
              postData.createdAt.nanoseconds / 1000000;
          return (
            <div key={i}>
              <OnePost
                profilePic={postData.profilePic}
                name={postData.name}
                id={postData.id}
                authId={postData.authid}
                msg={postData.message}
                likes={postData.likers ? postData.likers.length : 0}
                unlikes={postData.unlikers ? postData.unlikers.length : 0}
                millisec={millisec}
                comments={postData.comments}
                likers={postData.likers}
                unlikers={postData.unlikers}
              />
            </div>
          );
        })}
    </div>
  );
}
export default AllPosts;

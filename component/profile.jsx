import { db, auth } from "../fireb/firebApp";
import styles from "./styles/profile.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
} from "firebase/firestore";

function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersData", user.uid), (doc) => {
      setuserData(doc.data());
    });
  }, []);
  return (
    <div className={styles.container}>
      <img src={user.photoURL} alt='profilepic' />

      <article className={styles.info}>
        <b>Name: </b> <span>{user.displayName}</span>
        <b>Email: </b>
        <span>{user.email}</span>
      </article>
      <h1 className={styles.heading}>Skills Acquired</h1>
      {userData && (
        <div className={styles.skillsPanel}>
          {userData.skills.map((value, i) => {
            let level = Math.trunc(value.level * 100) / 100;
            return (
              <div key={i}>
                <details>
                  <summary>
                    <b>{value.name}: Level </b>
                    <b>{level}</b>
                  </summary>
                  <b>Tasks</b>
                  {value.tasks.map((value1, i1) => (
                    <div key={i1}>
                      <details className={styles.secDetails}>
                        <summary>{value1.name}</summary>
                        <i className={styles.secDetailsDes}>{value1.desc}</i>
                      </details>
                    </div>
                  ))}
                </details>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Profile;
import { db, auth } from "../fireb/firebApp";
import styles from "./styles/profile.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "usersData"),
      where("authId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data);
      setuserData(data);
    });
  }, []);
  console.log(user);
  return (
    <div className={styles.container}>
      <img src={user.photoURL} alt='profilepic' />

      <article className={styles.info}>
        <b>Name: </b> <span>{user.displayName}</span>
        <b>Email: </b>
        <span>{user.email}</span>
      </article>
      <h1 className={styles.heading}>Skills Acquired</h1>
      {userData.length > 0 && (
        <div className={styles.skillsPanel}>
          {userData[0].skills.map((value, i) => {
            return (
              <div key={i}>
                <details>
                  <summary>
                    <b>{value.name}: Level </b>
                    <b>{value.level}</b>
                  </summary>
                  <b>

                  Tasks
                  </b>
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

// <div className={styles.container}>
//       {userData.length > 0 && (
//         <h2>
//           {userData[0].skills.map((value, i) => {
//             return (
//               <div key={i}>
//                 <b>{value.name}</b>
//                 <b>{value.level}</b>
//                 {value.tasks.map((value1, i1) => (
//                   <div key={i1}>
//                     <li>{value1.name}</li>
//                     <i>{value1.desc}</i>
//                   </div>
//                 ))}
//                 <hr />
//               </div>
//             );
//           })}
//         </h2>
//       )}
//     </div>

import { db, auth } from "../fireb/firebApp";
import styles from "./styles/dailyTasks.module.scss";
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
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

function DailyTasks() {
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
  async function incDecLevel(i, n) {
    const userDoc = doc(db, "usersData", userData[0].id);
    let userDataCopy = userData;
    let skillsArray = userDataCopy[0].skills;
    for (let j = 0; j < skillsArray.length; j++) {
      if (j == i) {
        skillsArray[i].level += n;
      }
    }
    await updateDoc(userDoc, {
      skills: skillsArray,
    });
  }
  return (
    <div className={styles.container}>
      {userData[0] &&
        userData[0].skills.map((value, i) => {
          return (
            <div key={i}>
              <b>{value.name}: Level </b>
              <b>{value.level}</b>
              {value.tasks.map((value1, i1) => (
                <div key={i1}>
                  {value1.name}{" "}
                  <button onClick={() => incDecLevel(i, 0.3)}>Done</button>
                  <i>{value1.desc}</i>
                </div>
              ))}
              <hr />
            </div>
          );
        })}
    </div>
  );
}
export default DailyTasks;

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

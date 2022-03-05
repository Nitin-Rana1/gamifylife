import { db, auth } from "../fireb/firebApp";
import styles from "./styles/dailyTasks.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";

function DailyTasks() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    console.log("user", user);
    const unsub = onSnapshot(doc(db, "usersData", user.uid), (doc) => {
      setuserData(doc.data());
    });
  }, []);
  async function incDecLevel(i, n) {
    const userDoc = doc(db, "usersData", user.uid);
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
      {userData &&
        userData.skills.map((value, i) => {
          let level = Math.trunc(value.level * 100) / 100;
          return (
            <div key={i}>
              <b>{value.name}: Level </b>
              <b>{level}</b>
              {value.tasks.map((value1, i1) => (
                <div key={i1} className={styles.card}>
                  <div className={styles.head}>
                    <button onClick={() => incDecLevel(i, -0.3)}>
                      Not Done
                    </button>
                    {value1.name}
                    <button onClick={() => incDecLevel(i, 0.3)}>Done</button>
                  </div>
                  <p>{value1.desc}</p>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
export default DailyTasks;

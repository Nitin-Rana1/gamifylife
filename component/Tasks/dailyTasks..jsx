import { db, auth } from "../../fireb/firebApp";
import styles from "./styles/dailyTasks.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
function DailyTasks({ userUid }) {
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersData", userUid), (doc) => {
      setuserData(doc.data());
    });
  }, []);
  async function incDecLevel(i, n) {
    const userDoc = doc(db, "usersData", userUid);
    let userDataCopy = userData;
    let skillsArray = userDataCopy.skills;
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
                      <AiFillMinusCircle />
                    </button>
                    {value1.name}
                    <button onClick={() => incDecLevel(i, 0.3)}>
                      <AiFillPlusCircle />
                    </button>
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

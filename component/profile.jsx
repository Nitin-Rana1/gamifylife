import { db, auth } from "../fireb/firebApp";
import styles from "./styles/profile.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { Button, ButtonGroup } from "@chakra-ui/react";

function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersData", user.uid), (doc) => {
      setuserData(doc.data());
    });
  }, []);
  async function delTask(skillI, taskI) {
    const userDoc = doc(db, "usersData", user.uid);
    let userDataCopy = userData;
    let skillsArray = userDataCopy.skills;
    let delTask = skillsArray[skillI].tasks[taskI];
    await updateDoc(userDoc, {
      skills: arrayRemove(delTask),
    });
  }
  return (
    <div className={styles.container}>
      {userData && (
        <>
          <img src={userData.profilePic} alt='profilepic' />

          <article className={styles.info}>
            <b>Name: </b> <span>{user.displayName}</span>
            <b>Email: </b>
            <span>{user.email}</span>
          </article>
        </>
      )}
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
                        <summary className={styles.summaryFlex}>
                          {value1.name}
                          <Button
                            onClick={()=>delTask(i, i1)}
                            colorScheme='pink'
                            variant='solid'
                          >
                            Delete
                          </Button>
                        </summary>
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

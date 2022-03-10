import { useState, useEffect, useRef } from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./styles/addTasks.module.scss";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../fireb/firebApp";

function AddTasks() {
  const [skill, setSkill] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const taskInputRef = useRef(null);
  function add() {
    if (task == "") return;
    taskInputRef.current.value = "";
    setTask("");
    setTasks([...tasks, task]);
    console.log(tasks);
  }
  function upload() {

  }
  async function incDecLevel(i, n) {
    const userDoc = doc(db, "usersData", user.uid);
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
      <Heading className={styles.Heading}>Add Skill</Heading>
      <span>
        <label htmlFor='skill'>Skill: </label>
        <input
          onChange={(e) => setSkill(e.target.value)}
          type='text'
          name='skill'
          id='skill'
        />
      </span>
      <hr />
      <Heading className={styles.Heading} as='h1' size='md' isTruncated>
        Tasks
      </Heading>
      <span>
        <input
          ref={taskInputRef}
          type='text'
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={add} colorScheme='pink' variant='solid'>
          +
        </Button>
      </span>
      {tasks.length == 0 && <p>No tasks added!</p>}
      {tasks.map((val, i) => {
        return <div key={i}>{val}</div>;
      })}
      <hr />
      <Button onClick={upload} colorScheme='blue'>
        Upload
      </Button>
    </div>
  );
}
export default AddTasks;

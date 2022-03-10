import { useState, useEffect, useRef } from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./styles/addTasks.module.scss";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../fireb/firebApp";

function AddTasks({ userUid }) {
  const [skill, setSkill] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [taskDesc, setTaskDesc] = useState("none");
  const taskInputRef = useRef(null);
  const taskDescInputRef = useRef(null);

  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersData", userUid), (doc) => {
      setuserData(doc.data());
    });
  }, []);
  function add() {
    if (task == "") return;
    setTasks([...tasks, { name: task, desc: taskDesc }]);
    console.log(tasks);
    taskInputRef.current.value = "";
    taskDescInputRef.current.value = "";
    setTaskDesc("");
    setTask("");
  }
  async function upload() {
    const userDoc = doc(db, "usersData", user.uid);
    let newSkill = {
      name: skill,
      level: 0,
      tasks: [
        { name: "Running", desc: "running is good for health" },
        { name: "Climb Stairs", desc: "Climbing stairs is good for health" },
        { name: "Jogging", desc: "Jogging is good starting point" },
      ],
    };
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
      <div className={styles.task}>
        <Heading className={styles.Heading} as='h1' size='md' isTruncated>
          Tasks
        </Heading>
        <span>
          <label htmlFor='taskName'>Task Name:</label>
          <input
            ref={taskInputRef}
            type='text'
            onChange={(e) => setTask(e.target.value)}
          />
        </span>
        <br />
        <span>
          <textarea
            ref={taskDescInputRef}
            type='text'
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          <Button onClick={add} colorScheme='pink' variant='solid'>
            +
          </Button>
        </span>
      </div>
      {tasks.length == 0 ? (
        <p>No tasks added!</p>
      ) : (
        <div className={styles.taskList}>
          {tasks.map((val, i) => {
            return (
              <div key={i}>
                <Heading as='h1' size='sd' isTruncated>
                  Task {i + 1}
                </Heading>
                Name: {val.name}
                <br />
                Description: {val.desc}
              </div>
            );
          })}
        </div>
      )}
      <Button onClick={upload} colorScheme='blue'>
        Upload
      </Button>
    </div>
  );
}
export default AddTasks;

import { db, auth } from "../../fireb/firebApp";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddTasks from "./addTasks";
import DailyTasks from "./dailyTasks.";
import styles from "./styles/tasks.module.scss";
function Tasks({userUid}) {
  return (
    <div className={styles.container}>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab _selected={{ color: "green" }} fontSize='1.3em'>
            <b>Daily T</b>
          </Tab>
          <Tab _selected={{ color: "green" }} fontSize='1.3em'>
            <b>Add T</b>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DailyTasks userUid={userUid} />
          </TabPanel>

          <TabPanel>
            <AddTasks userUid={userUid}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default Tasks;

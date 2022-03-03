import DailyTasks from "./dailyTasks.";
import Profile from "./profile";
import Header from "./header";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from './styles/homePage.module.scss';
function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab _selected={{ color: 'green'}}>DailyTasks</Tab>
          <Tab _selected={{ color: 'green'}}>Profile</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DailyTasks />
          </TabPanel>
          <TabPanel>
            <Profile />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default HomePage;

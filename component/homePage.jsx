import DailyTasks from "./dailyTasks.";
import Profile from "./profile";
import Header from "./header";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from './styles/homePage.module.scss';
import SocialMedia from "./socialMedia";
function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <Tabs isFitted variant='enclosed' >
        <TabList mb='1em' >
          <Tab _selected={{ color: 'green'}} fontSize="1.2em">DailyTasks</Tab>
          <Tab _selected={{ color: 'green'}} fontSize="1.2em">Profile</Tab>
          <Tab _selected={{ color: 'green'}} fontSize="1.2em">Social Media</Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            <DailyTasks />
          </TabPanel>
          <TabPanel>
            <Profile />
          </TabPanel>
          
          <TabPanel>
            <SocialMedia/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default HomePage;

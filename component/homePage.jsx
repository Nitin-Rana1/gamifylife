import Profile from "./profile";
import Header from "./header";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "./styles/homePage.module.scss";
import SocialMedia from "./SocialMedia/socialMedia";
import { BsPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import Tasks from './Tasks/tasks';
function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab _selected={{ color: "green" }} fontSize='1.3em'>
            <b>
              <FaTasks />
            </b>
          </Tab>
          <Tab _selected={{ color: "green" }} fontSize='1.9em'>
            <b>
              <BsFillPersonFill />{" "}
            </b>
          </Tab>
          <Tab _selected={{ color: "green" }} fontSize='1.3em'>
            <b>
              <BsPeopleFill className={styles.icon} />
            </b>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tasks/>
          </TabPanel>
          <TabPanel>
            <Profile />
          </TabPanel>

          <TabPanel>
            <SocialMedia />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default HomePage;

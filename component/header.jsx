import { auth } from "../fireb/firebApp";
import { signOut } from "firebase/auth";
import styles from './styles/header.module.scss';
const logout = () => {
  signOut(auth);
};

function Header() {
  return (
    <div className={styles.container}>
      <span>GamifyHealthAndLife</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
export default Header;

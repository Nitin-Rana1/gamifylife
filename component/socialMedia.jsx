import styles from './styles/socialMedia.module.scss';

function SocialMedia() {
  return (
    <div className={styles.container}>
      <div className={styles.createPost}>
        <textarea id='ta' cols='30' rows='10'></textarea>
      </div>
    </div>
  );
}
export default SocialMedia;

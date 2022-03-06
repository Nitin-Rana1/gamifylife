import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";

import { auth, db } from "../../fireb/firebApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import styles from "../SocialMedia/styles/onePost.module.scss";
import { useState, useEffect } from 'react';


function OnePost({
  profilePic,
  name,
  id,
  msg,
  likes,
  unlikes,
  millisec,
  comments,
  likersAuthId,
  likers,
  dislikers,
}) {
  let date = new Date(millisec);
  let day = date.toDateString();
  let dayy = day.slice(0, -5);
  let time =
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    "  " +
    dayy;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [user, loading, error] = useAuthState(auth);
  async function like() {
    const pollDoc = doc(db, "messages", id);
    await updateDoc(pollDoc, {
      likers: arrayUnion(user.uid),
      unlikers: arrayRemove(user.uid),
    });
  }
  async function unlike() {
    const pollDoc = doc(db, "messages", id);
    await updateDoc(pollDoc, {
      likers: arrayRemove(user.uid),
      unlikers: arrayUnion(user.uid),
    });
  }
  async function voteLike(n) {
    if (n == 0) like();
    else if (n == 1) unlike();
  }
  async function addReply() {
    document.getElementById('comment').value = '';
    const pollDoc = doc(db, 'messages', id);
    await updateDoc(pollDoc, {
      comments: [...comments, {commenter: user.uid, comment: comment,profilePic: user.photoURL, }]
    });
  }
  return (
    <div className={styles.container}>
      <header>
        <span>
          <img src={profilePic} alt='avatora' />
        </span>
        <span>{name}</span>
        <span>{time}</span>
      </header>
      <main>{msg}</main>
      <div className={styles.likeBar}>
        <span onClick={() => voteLike(0)}>
          {likes} <BiLike className={styles.likeUnIcon} />
        </span>
        <span onClick={() => voteLike(1)}>
          {unlikes}
          <BiDislike className={styles.likeUnIcon} />
        </span>
        <span onClick={() => setShowComments(!showComments)}>
          {comments.length}
          <BiComment className={styles.likeUnIcon} />
        </span>
      </div>
      <hr />
      {showComments && (
        <p className={styles.commentInput}>
          <input
            type='text'
            name='comment'
            id='comment'
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={addReply}>
            <RiSendPlaneFill className={styles.sendIcon} />
          </button>
        </p>
      )}
      {showComments && <h2>Replies</h2>}
      <div className={styles.commSec}>
        {showComments &&
          (comments.length > 0 ? (
            comments.map((value, i) => {
              let index = comments.length - 1 - i;
              let val = comments[index];
              return (
                <div key={i} className={styles.oneComm}>
                  <img src={val.profilePic} alt='avatoro' />

                  <span>
                    <b>{val.commenter}</b>
                    <br />
                    {val.comment}
                  </span>
                </div>
              );
            })
          ) : (
            <p>
              <i>Be first to comment!</i>
            </p>
          ))}
      </div>
    </div>
  );
}
export default OnePost;

import React from "react";
import styles from "./Contents.module.scss";
import MessageList from "./MessageList";

const Contents = () => {
  return (
    <div className={styles.contents}>
      <MessageList />
    </div>
  );
};

export default Contents;

import React from "react";
import styles from "./Contents.module.scss";
import MessageList from "./MessageList";
import Form from "./Form";

const Contents = ({ chatId }) => {
  if (!chatId) {
    return <div className={styles.contents}>Hello</div>;
  }
  return (
    <div className={styles.contents}>
      <MessageList chatId={chatId} />
      <Form chatId={chatId} />
    </div>
  );
};

export default Contents;

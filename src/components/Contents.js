import React from "react";
import styles from "./Contents.module.scss";
import MessageList from "./MessageList";
import Form from "./Form";
import logo from "../logo.svg";

const Contents = ({ chatId }) => {
  if (!chatId) {
    return (
      <div className={styles.contents}>
        <div className={styles.center}>
          <img src={logo} className={styles.reactLogo} alt="react logo" />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.contents}>
      <MessageList chatId={chatId} />
      <Form chatId={chatId} />
    </div>
  );
};

export default Contents;

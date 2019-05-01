import React from "react";
import PropTypes from "prop-types";
import styles from "./Message.module.scss";
import getTimeString from "../library/getTimeString";

const Message = ({ me, time, children }) => {
  return (
    <div className={me ? styles.sentMessage : styles.receivedMessage}>
      <div className={me ? styles.sentMessageBox : styles.receivedMessageBox}>
        {children}
      </div>
      <div className={styles.time}>{getTimeString(time)}</div>
    </div>
  );
};

Message.propType = {
  me: PropTypes.bool,
  date: PropTypes.number
};

export default Message;

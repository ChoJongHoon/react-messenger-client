import React from "react";
import styles from "./Header.module.scss";
import MenuButton from "./MenuButton";
const Header = ({ setRedirectToReferrer, setShowTodo }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Messenger</div>
      <MenuButton
        className={styles.menuButton}
        setRedirectToReferrer={setRedirectToReferrer}
        setShowTodo={setShowTodo}
      />
      <img
        alt={window.sessionStorage.getItem("name")}
        className={styles.profile}
        src={window.sessionStorage.getItem("imgUrl")}
      />
    </div>
  );
};

export default Header;

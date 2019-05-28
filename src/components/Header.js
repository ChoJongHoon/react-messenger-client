import React from "react";
import styles from "./Header.module.scss";
import MenuButton from "./MenuButton";
import default_user from "./default_user.png";
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
        src={window.sessionStorage.getItem("imgUrl") || default_user}
      />
    </div>
  );
};

export default Header;

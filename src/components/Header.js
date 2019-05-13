import React from "react";
import styles from "./Header.module.scss";
import MenuButton from "./MenuButton";
const Header = ({ setRedirectToReferrer }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Messenger</div>
      <MenuButton
        className={styles.menuButton}
        setRedirectToReferrer={setRedirectToReferrer}
      />
    </div>
  );
};

export default Header;

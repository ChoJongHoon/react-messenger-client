import React from "react";
import PropTypes from "prop-types";
import styles from "./User.module.scss";
import defaultUser from "./default_user.png";

const User = ({ id, name, picture, onClickUser }) => {
  if (picture === "default") {
    picture = defaultUser;
  }
  return (
    <div className={styles.user} onClick={() => onClickUser(id)}>
      <img src={picture} alt="profile" className={styles.imgProfile} />
      <div className={styles.userName}>{name}</div>
    </div>
  );
};

User.propType = {
  id: PropTypes.String,
  name: PropTypes.String,
  picture: PropTypes.String,
  onClick: PropTypes.func
};

User.defaultProps = {
  id: "",
  name: "이름 없음",
  picture: "default",
  onClickUser: () => {
    console.warn("onClick is not define");
  }
};

export default User;

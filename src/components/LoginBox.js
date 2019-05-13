import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "./LoginBox.module.scss";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";

const LoginBox = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  if (redirectToReferrer || window.sessionStorage.getItem("id")) {
    return <Redirect to={"/"} />;
  }
  return (
    <div className={styles.loginBox}>
      <h1>로그인을 해주세요.</h1>
      <GoogleLoginButton setRedirectToReferrer={setRedirectToReferrer} />
      <FacebookLoginButton setRedirectToReferrer={setRedirectToReferrer} />
    </div>
  );
};

export default LoginBox;

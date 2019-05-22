import React from "react";
import { GoogleLogin } from "react-google-login";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styles from "./LoginButton.module.scss";

const addUser = gql`
  mutation addUser($_id: String!, $name: String!, $imageUrl: String!) {
    addUser(_id: $_id, name: $name, imageUrl: $imageUrl) {
      _id
    }
  }
`;

const GoogleLoginButton = ({ setRedirectToReferrer }) => {
  return (
    <Mutation mutation={addUser}>
      {(addUser, { data }) => (
        <GoogleLogin
          clientId="165456640557-6cjrts6a3lgjkupm0l6vsg1b8pk45q1l.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={res => {
            console.log(res);
            addUser({
              variables: {
                _id: res.profileObj.googleId,
                name: res.profileObj.name,
                imageUrl: res.profileObj.imageUrl
              }
            });
            window.sessionStorage.setItem("id", res.profileObj.googleId);
            window.sessionStorage.setItem("name", res.profileObj.name);
            window.sessionStorage.setItem("imgUrl", res.profileObj.imageUrl);
            setRedirectToReferrer(true);
          }}
          onFailure={err => {
            console.log(err);
          }}
          className={styles.loginButton}
        />
      )}
    </Mutation>
  );
};

export default GoogleLoginButton;

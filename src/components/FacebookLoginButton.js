import React from "react";
import FacebookLogin from "react-facebook-login";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const addUser = gql`
  mutation addUser($_id: String!, $name: String!, $imageUrl: String!) {
    addUser(_id: $_id, name: $name, imageUrl: $imageUrl) {
      _id
    }
  }
`;

const FacebookLoginButton = ({ setRedirectToReferrer }) => {
  return (
    <Mutation mutation={addUser}>
      {(addUser, { data }) => (
        <FacebookLogin
          appId=""
          autoLoad={false}
          fields="id,name,picture"
          redirectUri="https://localhost:3000/Login"
          callback={res => {
            addUser({
              variables: {
                _id: res.id,
                name: res.name,
                imageUrl: res.picture.data.url
              }
            });
            window.sessionStorage.setItem("id", res.id);
            window.sessionStorage.setItem("name", res.name);
            window.sessionStorage.setItem("imgUrl", res.picture.data.url);
            setRedirectToReferrer(true);
          }}
          icon="fa-facebook"
        />
      )}
    </Mutation>
  );
};

export default FacebookLoginButton;

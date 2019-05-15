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
          appId="2329703533974558"
          autoLoad={false}
          fields="id,name,picture"
          redirectUri="https://10.200.43.120:3000/Login"
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
            setRedirectToReferrer(true);
          }}
          icon="fa-facebook"
        />
      )}
    </Mutation>
  );
};

export default FacebookLoginButton;

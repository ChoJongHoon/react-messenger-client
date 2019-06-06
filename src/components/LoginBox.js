import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "./LoginBox.module.scss";
// import GoogleLoginButton from "./GoogleLoginButton";
// import FacebookLoginButton from "./FacebookLoginButton";
import Join from "./Join";
import {
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  Button
} from "@material-ui/core";
import { useAlert } from "react-alert";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

const user = gql`
  query($_id: String!) {
    user(_id: $_id) {
      _id
      password
      name
    }
  }
`;

const userConnectChange = gql`
  mutation($_id: String!, $online: Boolean!) {
    userConnectChange(_id: $_id, online: $online) {
      _id
      name
      online
    }
  }
`;

const LoginBox = () => {
  const alert = useAlert();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [showPassword, useShowPassword] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useQuery(user, {
    variables: {
      _id: id
    }
  });
  const userConnect = useMutation(userConnectChange, {
    variables: {
      _id: id,
      online: true
    }
  });

  const handleLogin = () => {
    if (!id) {
      alert.error("ID를 입력해주세요.");
    } else if (!password) {
      alert.error("패스워드를 입력해주세요.");
    } else if (!data.user) {
      alert.error("가입되지 않은 ID입니다.");
    } else {
      if (password === data.user.password) {
        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("name", data.user.name);
        userConnect();
        alert.success("로그인 성공!");
        setRedirectToReferrer(true);
      } else {
        alert.error("비밀번호가 틀렸습니다.");
      }
    }
  };
  if (redirectToReferrer || window.sessionStorage.getItem("id")) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <div className={styles.loginBox}>
        <h1>로그인을 해주세요.</h1>
        {/* <GoogleLoginButton setRedirectToReferrer={setRedirectToReferrer} />
      <FacebookLoginButton setRedirectToReferrer={setRedirectToReferrer} /> */}
        <TextField
          id="id"
          className={styles.id}
          variant="filled"
          type="text"
          label="ID"
          margin="normal"
          onChange={e => {
            setId(e.target.value);
          }}
          value={id}
        />
        <TextField
          id="password"
          className={styles.password}
          variant="filled"
          type={showPassword ? "text" : "password"}
          label="Password"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => useShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Icon>visibility</Icon>
                  ) : (
                    <Icon>visibility_off</Icon>
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={e => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <Button
          variant="contained"
          className={styles.button}
          color="primary"
          onClick={() => handleLogin()}
        >
          Login
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          color="secondary"
          onClick={() => setShowJoin(true)}
        >
          Join
        </Button>
      </div>
      <Join showJoin={showJoin} setShowJoin={setShowJoin} />
    </>
  );
};

export default LoginBox;

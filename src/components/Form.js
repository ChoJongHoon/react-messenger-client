import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { InputAdornment, TextField, Icon } from "@material-ui/core";
import styles from "./Form.module.scss";
import gql from "graphql-tag";

const sendMessage = gql`
  mutation sendMessage(
    $senderId: String!
    $receiverId: String!
    $contents: String!
    $time: Date!
  ) {
    sendMessage(
      senderId: $senderId
      receiverId: $receiverId
      contents: $contents
      time: $time
    ) {
      senderId
      receiverId
      contents
      time
    }
  }
`;

const Form = ({ chatId }) => {
  const [contents, setContents] = useState("");
  const mutaition = useMutation(sendMessage, {
    variables: {
      senderId: window.sessionStorage.getItem("id"),
      receiverId: chatId,
      contents,
      time: new Date()
    }
  });
  return (
    <div className={styles.form}>
      <TextField
        onChange={e => {
          setContents(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            setContents("");
            mutaition();
          }
        }}
        value={contents}
        fullWidth={true}
        margin="normal"
        label="Message"
        placeholder="Type your message."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className={styles.sendButton}>send</Icon>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default Form;

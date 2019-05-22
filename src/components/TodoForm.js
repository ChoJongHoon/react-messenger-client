import React, { useState } from "react";
import styles from "./TodoForm.module.scss";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const addTodo = gql`
  mutation addTodo($text: String) {
    addTodo(text: $text) {
      _id
      text
      done
    }
  }
`;

const TodoForm = () => {
  const [text, setText] = useState("");
  const onCreate = useMutation(addTodo, { variables: { text } });

  return (
    <div className={styles.form}>
      <input
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            onCreate();
            setText("");
          }
        }}
      />
      <div
        className={styles.createButton}
        onClick={() => {
          onCreate();
          setText("");
        }}
      >
        추가
      </div>
    </div>
  );
};

export default TodoForm;

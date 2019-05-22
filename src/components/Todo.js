import React from "react";
import styles from "./Todo.module.scss";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const todoToggle = gql`
  mutation todoToggle($_id: GraphQLObjectId) {
    todoToggle(_id: $_id) {
      _id
      text
      done
    }
  }
`;

const removeTodo = gql`
  mutation removeTodo($_id: GraphQLObjectId) {
    removeTodo(_id: $_id)
  }
`;

const Todo = ({ _id, text, done, refetch }) => {
  const onToggle = useMutation(todoToggle, {
    variables: { _id }
  });
  const onRemove = useMutation(removeTodo, {
    variables: { _id }
  });
  return (
    <div
      className={styles.todoItem}
      onClick={async () => {
        await onToggle();
        await refetch();
      }}
    >
      <div
        className={styles.remove}
        onClick={async e => {
          e.stopPropagation();
          await onRemove();
          await refetch();
        }}
      >
        &times;
      </div>
      <div className={`${styles.todoText} ${done ? "" : styles.checked}`}>
        <div>{text}</div>
      </div>
      {done && <div className={styles.checkMark} />}
    </div>
  );
};

export default Todo;

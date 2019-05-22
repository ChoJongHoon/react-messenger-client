import React from "react";
import styles from "./TodoList.module.scss";
import TodoForm from "./TodoForm";
import Todos from "./Todos";

const TodoList = ({ showTodo, setShowTodo }) => {
  return (
    <>
      <div
        className={`${styles.backgroundBlack} ${
          showTodo ? styles.show : styles.unShow
        }`}
        onClick={() => {
          setShowTodo(false);
        }}
      />
      <div
        className={`${styles.todoList} ${
          showTodo ? styles.show : styles.unShow
        }`}
      >
        <div className={styles.title}>오늘 할 일</div>
        <div className={styles.form}>
          <TodoForm />
        </div>
        <div className={styles.todos}>
          <Todos />
        </div>
      </div>
    </>
  );
};

export default TodoList;

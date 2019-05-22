import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import UserList from "./UserList";
import Contents from "./Contents";
import TodoList from "./TodoList";

const Home = () => {
  const [chatId, setChatId] = useState(null);
  const [showTodo, setShowTodo] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  if (redirectToReferrer || !window.sessionStorage.getItem("id")) {
    return <Redirect to={"/Login"} />;
  }
  return (
    <>
      <Header
        setRedirectToReferrer={setRedirectToReferrer}
        setShowTodo={setShowTodo}
      />
      <UserList setChatId={setChatId} />
      <Contents chatId={chatId} />
      <TodoList showTodo={showTodo} setShowTodo={setShowTodo} />
    </>
  );
};

export default Home;

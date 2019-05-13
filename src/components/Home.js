import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import UserList from "./UserList";
import Contents from "./Contents";

const Home = () => {
  const [chatId, setChatId] = useState(null);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  console.log(chatId);
  if (redirectToReferrer || !window.sessionStorage.getItem("id")) {
    return <Redirect to={"/Login"} />;
  }
  return (
    <>
      <Header setRedirectToReferrer={setRedirectToReferrer} />
      <UserList setChatId={setChatId} />
      <Contents chatId={chatId} />
    </>
  );
};

export default Home;

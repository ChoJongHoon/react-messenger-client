import React, { Component } from "react";
import Header from "./Header";
import UserList from "./UserList";
import Contents from "./Contents";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <UserList />
        <Contents />
      </div>
    );
  }
}

export default App;

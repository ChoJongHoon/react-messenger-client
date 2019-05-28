import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import client from "./apolloClient";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./Home";
import LoginPage from "./LoginPage";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  containerStyle: {
    zIndex: 1001
  }
};

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Router>
              <Route exact path={"/"} component={Home} />
              <Route path={"/chat/:id"} component={Home} />
              <Route path={"/Login"} component={LoginPage} />
            </Router>
          </AlertProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;

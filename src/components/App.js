import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import client from "./apolloClient";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import Home from "./Home";
import LoginPage from "./LoginPage";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Router>
            <Route exact path={"/"} component={Home} />
            <Route path={"/chat/:id"} component={Home} />
            <Route path={"/Login"} component={LoginPage} />
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;

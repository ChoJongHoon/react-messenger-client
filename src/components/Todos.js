import React from "react";
import Todo from "./Todo";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getTodos = gql`
  query {
    todos {
      _id
      text
      done
    }
  }
`;

const newTodo = gql`
  subscription {
    newTodo {
      _id
      text
      done
    }
  }
`;

let unsubscribe = null;

const Todos = () => {
  return (
    <Query query={getTodos}>
      {({ loading, data, refetch, subscribeToMore }) => {
        if (loading) return "loading";

        if (!unsubscribe) {
          unsubscribe = subscribeToMore({
            document: newTodo,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }
              const { newTodo } = subscriptionData.data;
              return {
                ...prev,
                todos: [...prev.todos, newTodo]
              };
            }
          });
        }
        refetch();
        return data.todos.map(({ _id, text, done }) => (
          <Todo key={_id} _id={_id} text={text} done={done} refetch={refetch} />
        ));
      }}
    </Query>
  );
};

export default Todos;

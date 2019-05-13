import React from "react";
import Message from "./Message";
import styles from "./MessageList.module.scss";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getMessages = gql`
  query messages($userId1: String!, $userId2: String!) {
    messages(userId1: $userId1, userId2: $userId2) {
      _id
      senderId
      receiverId
      contents
      time
    }
  }
`;

const newMessage = gql`
  subscription newMessage($roomId: String) {
    newMessage(roomId: $roomId) {
      senderId
      receiverId
      contents
      time
    }
  }
`;

let unsubscribe = null;

const MessageList = ({ chatId }) => {
  console.log(chatId);
  return (
    <Query
      query={getMessages}
      variables={{
        userId1: window.sessionStorage.getItem("id"),
        userId2: chatId
      }}
    >
      {({ loading, error, data: { messages }, subscribeToMore }) => {
        if (!unsubscribe) {
          unsubscribe = subscribeToMore({
            document: newMessage,
            variables: {
              roomId:
                window.sessionStorage.getItem("id") < chatId
                  ? window.sessionStorage.getItem("id") + chatId
                  : chatId + window.sessionStorage.getItem("id")
            },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }
              const { newMessage } = subscriptionData.data;
              return {
                ...prev,
                messages: [...prev.messages, newMessage]
              };
            }
          });
        }
        console.log(messages);
        return loading ? null : (
          <div className={styles.messageList}>
            {messages.map(message => (
              <Message
                key={message._id}
                me={message.senderId === window.sessionStorage.getItem("id")}
                time={message.time}
              >
                {message.contents}
              </Message>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default MessageList;

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
      _id
      senderId
      receiverId
      contents
      time
    }
  }
`;

let unsubscribe = null;

class MessageList extends React.Component {
  scrollToBottom = () => {
    setTimeout(() => {
      this.messagesEnd.scrollIntoView();
    }, 100);
  };

  render() {
    const { chatId } = this.props;
    console.log(
      window.sessionStorage.getItem("id") < chatId
        ? window.sessionStorage.getItem("id") + chatId
        : chatId + window.sessionStorage.getItem("id")
    );
    return (
      <div>
        <Query
          query={getMessages}
          variables={{
            userId1: window.sessionStorage.getItem("id"),
            userId2: chatId
          }}
        >
          {({ loading, error, data, subscribeToMore, refetch }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return error;
            }
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
              refetch();
            }
            refetch();
            this.scrollToBottom();
            return (
              <div className={styles.messageList}>
                {data.messages.map(message => (
                  <Message
                    key={message._id}
                    me={
                      message.senderId === window.sessionStorage.getItem("id")
                    }
                    time={message.time}
                  >
                    {message.contents}
                  </Message>
                ))}
              </div>
            );
          }}
        </Query>

        <div
          style={{
            float: "left",
            clear: "both"
          }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default MessageList;

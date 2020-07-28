import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import withSuspense from "../../componetns/withSuspense";
import styles from "../../styles";
import constants from "../../constants";

const GET_MESSAGES = gql`
  query messages($roomId: String!) {
    messages(roomId: $roomId) {
      id
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($toId: String!, $message: String!, $roomId: String!) {
    sendMessage(toId: $toId, message: $message, roomId: $roomId) {
      id
      text
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
    }
  }
`;

const MyMessageWrapper = styled.View`
  flex-flow: column nowrap;
  width: ${constants.width - 15}px;
  flex: 1;
`;

const MyMessages = styled.View`
  padding: 15px;
  margin: 0px 5px 10px;
  border-radius: 30px;
  background-color: ${styles.lightGreyColor};
  align-self: flex-end;
`;

const MyMessage = styled.Text`text-align: right;`;

export default ({ navigation }) => {
  const [message, setMessage] = useState("");
  const toId = "ckcym4okauwnq099955fb3iwz";
  const roomId = navigation.getParam("roomId");
  let viewNum = -5;
  const { data } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomId
    }
  });

  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => {
        const temp = previous.slice(viewNum);
        return [...temp];
      });
    }
  };

  useEffect(
    () => {
      handleNewMessage();
    },
    [data]
  );

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      toId: toId,
      message: message,
      roomId: roomId
    },
    refetchQueries: () => [
      {
        query: GET_MESSAGES,
        variables: {
          roomId: roomId
        }
      }
    ]
  });

  const { data: { messages: oldMessages }, error } = useQuery(GET_MESSAGES, {
    variables: {
      roomId: roomId
    }
  });

  const [messages, setMessages] = useState(oldMessages.slice(viewNum) || []);

  const onChangeText = text => setMessage(text);

  let temp = 0;

  const onSubMit = async () => {
    if (message === "") {
      return;
    }
    try {
      setMessages(oldMessages => [...oldMessages, { id: temp++, text: message }]);
      setMessage("");
      await sendMessageMutation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: "center" }}
      keyboardVerticalOffset={constants.height / 12}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <MyMessageWrapper>
          {messages.map(
            m =>
              m &&
              <MyMessages key={m.id}>
                <MyMessage>
                  {m.text}
                </MyMessage>
              </MyMessages>
          )}
        </MyMessageWrapper>
      </ScrollView>
      <TextInput
        placeholder="Message..."
        style={{
          marginBottom: 25,
          width: "90%",
          borderRadius: 50,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: "#f2f2f2",
          fontSize: 14
        }}
        returnKeyType="send"
        value={message}
        onChangeText={onChangeText}
        onSubmitEditing={onSubMit}
      />
    </KeyboardAvoidingView>
  );
};

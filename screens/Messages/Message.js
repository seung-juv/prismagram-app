import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import withSuspense from "../../componetns/withSuspense";
import { gql } from "apollo-boost";
import { useSubscription, useMutation, useQuery } from "react-apollo-hooks";

const GET_MESSAGES = gql`
  query messages($roomId: String!) {
    messages(roomId: $roomId) {
      id
      text
      from {
        avatar
        username
      }
      to {
        avatar
        username
      }
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

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 12px 8px;
`;

const Message = () => {
  const [message, setMessage] = useState("");
  const toId = "ckcym4okauwnq099955fb3iwz";
  const roomId = "ckcyp5q30f1wg0975jltods7m";
  const { data } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomId
    }
  });
  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => [...previous, newMessage]);
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
    refetchQueries: () => [{ query: GET_MESSAGES }]
  });
  const { data: { messages: oldMessages }, error } = useQuery(GET_MESSAGES, {
    variables: {
      roomId: roomId
    },
    suspend: true
  });
  const [messages, setMessages] = useState(oldMessages || []);
  const onChangeText = text => setMessage(text);
  const onSubMit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 50,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {messages.map(
          m =>
            m &&
            <View key={m.id} style={{ marginBottom: 10 }}>
              <Text>
                {console.log(roomId)}
                {m.text}
              </Text>
            </View>
        )}
        <TextInput
          placeholder="Type a message"
          style={{
            marginTop: 50,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "#f2f2f2"
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubMit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withSuspense(Message);

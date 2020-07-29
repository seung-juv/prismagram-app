import React, { useState, useEffect, useRef } from "react";
import { ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import withSuspense from "../../componetns/withSuspense";
import styles from "../../styles";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const TextInputWarpper = styled.View`
  margin-bottom: 25px;
  width: ${constants.width - 15}px;
  flex-flow: row nowrap;
  border-radius: 50px;
  padding: 15px 15px;
  background-color: #f2f2f2;
`;

const Send = styled.Text`
  color: ${styles.blueColor};
  font-size: 14px;
  font-weight: 500;
`;

const Message = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const opponent = navigation.getParam("opponent");
  const toId = opponent.id;
  const roomId = navigation.getParam("roomId");
  let viewNum = -8;

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
        return [...temp, newMessage];
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
    },
    suspend: true
  });

  const [messages, setMessages] = useState(oldMessages.slice(viewNum) || []);

  const onChangeText = text => setMessage(text);

  const scrollViewRef = useRef();
  const onScrollToEnd = () => scrollViewRef.current.scrollToEnd({ animated: true });

  const onSubMit = async () => {
    if (message === "") {
      return;
    }
    try {
      setMessage("");
      onScrollToEnd();
      await sendMessageMutation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: "center" }}
      keyboardVerticalOffset={constants.height / 12}
      enabled
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
        ref={scrollViewRef}
        onContentSizeChange={onScrollToEnd}
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
      <TextInputWarpper>
        <TextInput
          placeholder="Message..."
          style={{
            fontSize: 14,
            flex: 1
          }}
          returnKeyType="send"
          blurOnSubmit={false}
          value={message}
          onTouchStart={() => setTimeout(onScrollToEnd, 500)}
          onChangeText={onChangeText}
          onSubmitEditing={onSubMit}
        />
        <TouchableOpacity onPress={onSubMit}>
          <Send>Send</Send>
        </TouchableOpacity>
      </TextInputWarpper>
    </KeyboardAvoidingView>
  );
};

export default withSuspense(Message);

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useSubscription } from "react-apollo-hooks";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const GET_MESSAGES = gql`
  query messages($roomId: String!) {
    messages(roomId: $roomId) {
      id
      text
      from {
        id
        username
      }
      to {
        id
        username
      }
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
      from {
        id
        username
      }
      to {
        id
        username
      }
    }
  }
`;

const Wrapper = styled.View`
  flex-flow: row nowrap;
  align-items: center;
  padding: 12px 8px;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

const MetaWrapper = styled.View``;

const Username = styled.Text`
  font-size: 14px;
  margin-bottom: 2px;
`;

const Status = styled.Text`
  color: ${styles.darkGreyColor};
  font-weight: 300;
  padding-right: 150px;
`;

export default ({ id, participants, me, navigation }) => {
  const roomId = id;

  const { data: { messages: oldMessages }, error } = useQuery(GET_MESSAGES, {
    variables: {
      roomId: roomId
    },
    suspend: true
  });
  const [opponent] = participants.filter(user => user.username !== me);

  const [messages, setMessages] = useState(oldMessages || []);

  const { data } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomId
    }
  });

  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => {
        const temp = previous;
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
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          roomId: id,
          opponent: opponent,
          username: opponent.username
        })}
    >
      <Wrapper>
        <Avatar source={{ uri: opponent && opponent.avatar }} />
        <MetaWrapper>
          <Username>
            {opponent && opponent.username}
          </Username>
          <Status numberOfLines={1} eliellipsizeMode="tail">
            {messages[messages.length - 1].text}
          </Status>
        </MetaWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

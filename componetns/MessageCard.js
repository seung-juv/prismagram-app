import React from "react";
import styled from "styled-components";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

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

export default ({ id, messages, participants, me, navigation }) => {
  const [opponent] = participants.filter(user => user.username !== me && user.username);
  const lastestMessage = messages[messages.length - 1];
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Message", { roomId: id })}>
      <Wrapper>
        <Avatar source={{ uri: opponent && opponent.avatar }} />
        <MetaWrapper>
          <Username>
            {opponent && opponent.username}
          </Username>
          <Status numberOfLines={1} eliellipsizeMode="tail">
            {lastestMessage.text}
          </Status>
        </MetaWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

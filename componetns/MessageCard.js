import React from "react";
import styled from "styled-components";

const Wrapper = styled.View``;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const MetaWrapper = styled.View``;

const Username = styled.Text``;

const Status = styled.Text``;

export default ({ id, messages, participants, createdAt, updatedAt, me }) => {
  const [opponent] = participants.map(
    user => (user.username == me ? user.username : user.username)
  );
  return (
    <Wrapper>
      <Avatar source={{ uri: participants && participants.Avatar }} />
    </Wrapper>
  );
};

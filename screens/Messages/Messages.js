import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import MessageCard from "../../componetns/MessageCard";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: { me }, loading, refetch } = useQuery(ME);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {!loading &&
        me.rooms &&
        me.rooms.map(room => <MessageCard key={room.id} me={me.username} {...room} />)}
    </ScrollView>
  );
};

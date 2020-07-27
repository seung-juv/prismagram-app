import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import MessageCard from "../../componetns/MessageCard";
import Loader from "../../componetns/Loader";
import constants from "../../constants";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const LoaderWrapper = styled.View`
  flex: 1;
  height: ${constants.height / 1.25}px;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(ME);
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
      {loading
        ? <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        : data &&
          data.me &&
          data.me.rooms &&
          data.me.rooms.map(room =>
            <MessageCard key={room.id} me={data.me.username} navigation={navigation} {...room} />
          )}
    </ScrollView>
  );
};

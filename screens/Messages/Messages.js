import React, { useState } from "react";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import MessageCard from "../../componetns/MessageCard";
import withSuspense from "../../componetns/withSuspense";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Messages = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useQuery(ME, {
    suspend: true
  });
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
      {data &&
        data.me &&
        data.me.rooms &&
        data.me.rooms.map(room =>
          <MessageCard key={room.id} me={data.me.username} navigation={navigation} {...room} />
        )}
    </ScrollView>
  );
};

export default withSuspense(Messages);

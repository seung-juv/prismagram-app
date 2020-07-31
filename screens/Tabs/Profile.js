import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import UserProfile from "../../componetns/UserProfile";
import withSuspense from "../../componetns/withSuspense";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default withSuspense(() => {
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
      {data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
});

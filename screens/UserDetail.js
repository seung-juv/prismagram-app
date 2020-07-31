import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { USER_FRAGMENT } from "../fragments";
import { gql } from "apollo-boost";
import UserProfile from "../componetns/UserProfile";
import withSuspense from "../componetns/withSuspense";

const GET_USER = gql` 
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default withSuspense(({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") },
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
      {data && data.seeUser && <UserProfile {...data.seeUser} />}
    </ScrollView>
  );
});

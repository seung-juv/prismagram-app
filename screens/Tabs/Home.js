import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../componetns/Loader";
import { useQuery } from "react-apollo-hooks";
import Post from "../../componetns/Post";
import { POST_FRAGMENT } from "../../fragments";
import constants from "../../constants";

const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const LoaderWrapper = styled.View`
  flex: 1;
  height: ${constants.height / 1.25}px;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(FEED_QUERY);
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
        : data && data.seeFeed && data.seeFeed.map(post => <Post key={post.id} {...post} />)}
    </ScrollView>
  );
};

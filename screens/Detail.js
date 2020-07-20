import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../fragments";
import { gql } from "apollo-boost";
import Loader from "../componetns/Loader";
import Post from "../componetns/Post";

const POST_DETAIL = gql` 
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, { variables: { id: navigation.getParam("id") } });
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.seeFullPost && <Post {...data.seeFullPost} />}
    </ScrollView>
  );
};

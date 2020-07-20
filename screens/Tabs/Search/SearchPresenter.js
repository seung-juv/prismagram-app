import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import propTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";
import Loader from "../../../componetns/Loader";
import SquarePhoto from "../../../componetns/SquarePhoto";
import constants from "../../../constants";

const LoaderWrapper = styled.View`
  flex: 1;
  height: ${constants.height / 1.25}px;
  justify-content: center;
  align-items: center;
`;

const PostContainer = styled.View`
  flex: 1;
  flex-flow: row nowrap;
  margin-left: -1px;
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: term });
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
          data.searchPost &&
          <PostContainer>
            {data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)}
          </PostContainer>}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: propTypes.string.isRequired,
  shouldFetch: propTypes.bool.isRequired
};

export default SearchPresenter;
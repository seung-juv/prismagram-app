import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import propTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";
import Loader from "../../../componetns/Loader";
import SquarePhoto from "../../../componetns/SquarePhoto";

const Wrapper = styled.View`
  flex: 1;
  flex-flow: row nowrap;
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
      <Wrapper>
        {loading
          ? <Loader />
          : data &&
            data.searchPost &&
            data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)}
      </Wrapper>
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: propTypes.string.isRequired,
  shouldFetch: propTypes.bool.isRequired
};

export default SearchPresenter;

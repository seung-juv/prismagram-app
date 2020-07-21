import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import SquarePhoto from "./SquarePhoto";

const SquarePhotoWrapper = styled.View`
  flex-flow: row nowrap;
  margin-left: -1px;
`;

const SquarePhotoContainer = ({ posts }) => {
  const result = [];
  let num = 0;
  for (let i = 0; i <= posts.length; i += 3) {
    const temp = posts.slice(i, i + 3);
    result.push(
      <SquarePhotoWrapper key={num}>
        {temp.map(post => <SquarePhoto key={post.id} {...post} />)}
      </SquarePhotoWrapper>
    );
    num++;
  }
  return result;
};

SquarePhotoContainer.propTypes = {
  posts: propTypes.array
};

export default SquarePhotoContainer;

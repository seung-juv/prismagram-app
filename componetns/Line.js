import React from "react";
import styled from "styled-components";

export default ({ width = "0px", margin = "0px", color = "#000" }) => {
  const Line = styled.View`
    width: ${width};
    margin: ${margin};
    height: 1px;
    background-color: ${color};
  `;
  return <Line />;
};

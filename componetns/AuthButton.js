import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  width: ${constants.width / 1.5}px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false }) =>
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading
        ? <ActivityIndicator color={"white"} />
        : <Text>
            {text}
          </Text>}
    </Container>
  </Touchable>;

AuthButton.propTypes = {
  loading: propTypes.bool,
  text: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired
};

export default AuthButton;

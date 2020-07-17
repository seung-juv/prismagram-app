import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`margin-bottom: 10px;`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.5}px;
  padding: 10px;
  background-color: ${props => props.theme.greyColor};
  border: 2px solid ${props => props.theme.lightGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  authCorrect = true,
  secureTextEntry = false
}) =>
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      authCorrect={authCorrect}
      secureTextEntry={secureTextEntry}
      value={value}
    />
  </Container>;

AuthInput.propTypes = {
  placeholder: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  keyboardType: propTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: propTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: propTypes.func.isRequired,
  returnKeyType: propTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: propTypes.func,
  authCorrect: propTypes.bool
};

export default AuthInput;

import React from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT, LOG_IN } from "../screens/Auth/AuthQueries";

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ setLoading }) => {
  let emailValue = null;
  let firstNameValue = null;
  let lastNameValue = null;
  let usernameValue = null;

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailValue,
      password: "facebook",
      firstName: firstNameValue,
      lastName: lastNameValue,
      username: usernameValue
    }
  });

  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync("<APP_ID>");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync("1193931677615492", {
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email,name`
        );
        const { email, first_name, last_name, name, id } = await response.json();
        const [username] = email.split("@");
        emailValue = email;
        firstNameValue = first_name;
        lastNameValue = last_name;
        usernameValue = username;
        try {
          const { data: { createAccount } } = await createAccountMutation();
          if (createAccount) {
            Alert.alert("Logged in!", `Hi ${name}!`);
          } else {
            Alert.alert("Can't log in now");
          }
        } catch (error) {
          alert(`Create Account Error: ${error}`);
        }

        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    setLoading(false);
  };

  return (
    <Touchable onPress={fbLogin}>
      <LoginLink>
        <LoginLinkText>Connect Facebook</LoginLinkText>
      </LoginLink>
    </Touchable>
  );
};

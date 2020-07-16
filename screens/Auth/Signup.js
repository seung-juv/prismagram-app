import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../componetns/AuthButton";
import AuthInput from "../../componetns/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import constants from "../../constants";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2}px;
  height: 60px;
  margin-bottom: 25px;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const userNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      username: userNameInput.value
    }
  });

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: userName } = userNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (firstName === "") {
      return Alert.alert("I need your name");
    }
    if (userName === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const { data: { createAccount } } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthInput {...emailInput} placeholder="Email" authCorrect={false} />
        <AuthInput
          {...firstNameInput}
          placeholder="First name"
          authCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last name"
          keyboardType="email-address"
          returnKeyType="send"
          authCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput {...userNameInput} placeholder="Username" authCorrect={false} />
        <AuthButton loading={loading} text="Sign up" onPress={handleSignup} />
      </View>
    </TouchableWithoutFeedback>
  );
};

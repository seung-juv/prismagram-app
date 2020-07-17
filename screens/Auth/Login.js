import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../componetns/AuthButton";
import AuthInput from "../../componetns/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { LOG_IN } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import constants from "../../constants";
import { useLogIn } from "../../AuthContext";
import ConnectFacebookButton from "../../componetns/ConnectFacebookButton";
import Line from "../../componetns/Line";

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
  const passwordInput = useInput(navigation.getParam("password", ""));
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [logInMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
      password: passwordInput.value
    }
  });

  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please write an email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }
    try {
      setLoading(true);
      const { data: { logIn: logInData } } = await logInMutation();
      if (logIn !== "" || logIn !== false) {
        logIn(logInData);
      } else {
        Alert.alert("Can't log in now");
      }
    } catch (error) {
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          onSubmitEditing={handleLogin}
          authCorrect={false}
        />
        <AuthInput
          {...passwordInput}
          placeholder="Password"
          authCorrect={false}
          secureTextEntry={true}
          returnKeyType="send"
        />
        <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
        <Line
          width={`${constants.width / 1.5}px`}
          margin="25px 0px"
          color={props => props.theme.lightGreyColor}
        />
        <ConnectFacebookButton navigation={navigation} setLoading={setLoading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

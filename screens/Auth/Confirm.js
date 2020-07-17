import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../componetns/AuthButton";
import AuthInput from "../../componetns/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";
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
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email")
    }
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const { data: { confirmSecret } } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (error) {
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          authCorrect={false}
        />
        <AuthButton loading={loading} text="Confirm" onPress={handleConfirm} />
      </View>
    </TouchableWithoutFeedback>
  );
};

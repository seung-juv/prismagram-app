import React, { useState } from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../componetns/AuthButton";
import Line from "../../componetns/Line";
import ConnectFacebookButton from "../../componetns/ConnectFacebookButton";

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

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <AuthButton text={"Create New Account"} onPress={() => navigation.navigate("Signup")} />
      <Touchable onPress={() => navigation.navigate("Login")}>
        <LoginLink>
          <LoginLinkText>Log in</LoginLinkText>
        </LoginLink>
      </Touchable>
      <Line
        width={`${constants.width / 1.5}px`}
        margin="25px 0px"
        color={props => props.theme.lightGreyColor}
      />
      <ConnectFacebookButton navigation={navigation} setLoading={setLoading} />
    </View>
  );
};

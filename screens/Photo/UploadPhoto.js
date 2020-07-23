import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import { Image, ActivityIndicator, View, Alert } from "react-native";
import styles from "../../styles";
import constants from "../../constants";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`justify-content: flex-start;`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const name = photo.filename;
  const [, type] = name.split(".");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  });
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri
    });
    try {
      setIsLoading(true);
      const {
        data: { file: { path } }
      } = await axios.post("http://prismagram.kingsky32.co.kr:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      const filePath = `http://prismagram.kingsky32.co.kr:4000/${path}`;
      const { data: { upload } } = await uploadMutation({
        variables: {
          files: [filePath],
          caption: captionInput.value,
          location: locationInput.value
        }
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Can't upload", "Try later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image source={{ uri: photo.uri }} style={{ height: 80, width: 80, marginRight: 30 }} />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {isLoading ? <ActivityIndicator color="white" /> : <Text>Upload</Text>}
          </Button>
        </Form>
      </Container>
    </View>
  );
};

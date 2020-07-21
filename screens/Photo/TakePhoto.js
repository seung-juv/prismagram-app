import React, { useState, useEffect, useRef } from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import { Camera } from "expo-camera";
import Loader from "../../componetns/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 85px;
  height: 85px;
  border-radius: 50px;
  border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [loading, setLoading] = useState(true);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const takePhoto = async () => {
    if(!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("Upload", { photo: asset });
    } catch (error) {
      console.log(error)
      setCanTakePhoto(true);
    }
  }
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      console.log(error);
      hasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  return (
    <View>
      {loading
        ? <Loader />
        : hasPermission
          ? <>
              <Camera
                ref={cameraRef}
                type={cameraType}
                style={{
                  justifyContent: "flex-end",
                  paddingHorizontal: 15,
                  paddingBottom: 7,
                  width: constants.width,
                  height: constants.height / 2.165
                }}
              >
                <TouchableOpacity onPress={toggleType}>
                  <Ionicons
                    name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"}
                    size={42}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </Camera>
              <View>
                <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
                  <Button />
                </TouchableOpacity>
              </View>
            </>
          : null}
    </View>
  );
};

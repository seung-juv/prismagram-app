import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../componetns/Loader";
import { Image, ScrollView } from "react-native";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";

const View = styled.View`justify-content: center;`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Text= styled.Text`
  color: white;
  font-weight: 600; 
`;

export default ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = photo => {
    setSelected(photo)
  }
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
      
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      hasPermission(false);
    }
  };
  const handleSelected = () => {
    navigation.navigate("Upload", { photo: selected });
  }
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading
        ? <Loader />
        : <View>
            {hasPermission
              ? (
                <>
                  <Image
                    style={{ width: constants.width, height: constants.height / 2 }}
                    source={{ uri: selected.uri }}
                  />
                  <Button onPress={handleSelected}>
                    <Text>Select Photo</Text>
                  </Button>
                  
                  <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", paddingBottom: 250}}>
                    {allPhotos.map(photo =>
                      <TouchableOpacity activeOpacity={1} key={photo.id} onPress={() => changeSelected(photo)}>
                      <Image
                        style={{ width:constants.width / 4, height: constants.width / 4, opacity: photo.id === selected.id ? 0.5 : 1 }}
                        source={{uri: photo.uri}}
                      />
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                </>
                )
              : null}
          </View>}
    </View>
  );
};

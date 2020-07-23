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
  right: 15px;
  top: 75px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px; 
`;

const Text= styled.Text`
  color: white;
  font-weight: 600; 
`;

const SquarePhotoWrapper = styled.View`
  flex-flow: row nowrap;
  margin-left: -1px;
`;

const SquarePhotoContainer = ({ photos, selected, changeSelected }) => {
  const result = [];
  const maxRow = 4;
  let num = 0;
  for (let i = 0; i <= photos.length; i += maxRow) {
    const temp = photos.slice(i, i + maxRow);
    result.push(
      <SquarePhotoWrapper key={num}>
        {temp.map(photo => <TouchableOpacity activeOpacity={1} key={photo.id} onPress={() => changeSelected(photo)}>
            <Image
              style={{
                width: constants.width / 4 - 1, 
                height: constants.width / 4 - 1,
                opacity: photo.id === selected.id ? 0.5 : 1,
                margin: 1
              }}
              source={{ uri: photo.uri }}
            />
          </TouchableOpacity>
        )}
      </SquarePhotoWrapper>
    );
    num++;
  }

  const afadf = photos.map(photo =>
    <TouchableOpacity activeOpacity={1} key={photo.id} onPress={() => changeSelected(photo)}>
    <Image
      style={{ width:constants.width / 4, height: constants.width / 4, opacity: photo.id === selected.id ? 0.5 : 1 }}
      source={{uri: photo.uri}}
    />
    </TouchableOpacity>
  )

  return result;
};

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
    } catch (error) {
      console.log(error);
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
                  
                  <ScrollView contentContainerStyle={{paddingBottom: 250}}>
                    <SquarePhotoContainer photos={allPhotos} selected={selected} changeSelected={changeSelected} />
                  </ScrollView>
                  
                </>
                )
              : null}
          </View>}
    </View>
  );
};

import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { withNavigation } from "react-navigation";
import propTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ navigation, files = [], id }) =>
  <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
    <View
      style={{
        width: constants.width / 3 - 1,
        height: constants.width / 3 - 1,
        margin: 1
      }}
    >
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3 - 1, height: constants.width / 3 - 1 }}
      />
    </View>
  </TouchableOpacity>;

SquarePhoto.propTypes = {
  files: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      url: propTypes.string.isRequired
    })
  ).isRequired,
  id: propTypes.string.isRequired
};

export default withNavigation(SquarePhoto);

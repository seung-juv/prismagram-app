import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import propTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ navigation, files = [], id }) =>
  <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
    <Image
      source={{ uri: files[0].url }}
      style={{ width: constants.width / 3, height: constants.width / 3 }}
    />
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

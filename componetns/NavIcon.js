import React from "react";
import { Ionicons } from "@expo/vector-icons";
import propTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({ focused = true, name, color = styles.blackColor, size = 22 }) =>
  <Ionicons name={name} color={focused ? color : styles.darkGreyColor} size={size} />;

NavIcon.propTypes = {
  name: propTypes.string.isRequired,
  color: propTypes.string,
  focused: propTypes.bool
};

export default NavIcon;

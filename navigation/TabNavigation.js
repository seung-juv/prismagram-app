import React from "react";
import { Image, Platform } from "react-native";
import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../componetns/MessagesLink";
import NavIcon from "../componetns/NavIcon";
import { stackStyles, cardStyles } from "./config";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
        headerStyle: {
          ...stackStyles
        },
        cardStyle: {
          ...cardStyles
        }
      }
    }
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: () => <MessagesLink />,
        headerTitle: () =>
          <Image
            style={{ height: 28 }}
            resizeMode={"contain"}
            source={require("../assets/logo.png")}
          />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
      }
    },
    Search: {
      screen: stackFactory(Search, {
        headerRight: () => <MessagesLink />,
        headerTitle: () =>
          <Image
            style={{ height: 28 }}
            resizeMode={"contain"}
            source={require("../assets/logo.png")}
          />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
      }
    },
    Add: {
      screen: () => <View />,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <NavIcon
            focused={focused}
            size={32}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          />,
        tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        headerRight: () => <MessagesLink />,
        headerTitle: () =>
          <Image
            style={{ height: 28 }}
            resizeMode={"contain"}
            source={require("../assets/logo.png")}
          />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused ? "ios-heart" : "ios-heart-empty"
                : focused ? "md-heart" : "md-heart-empty"
            }
          />
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        headerRight: () => <MessagesLink />,
        headerTitle: () =>
          <Image
            style={{ height: 28 }}
            resizeMode={"contain"}
            source={require("../assets/logo.png")}
          />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        ...stackStyles
      }
    }
  }
);

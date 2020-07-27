import React from "react";
import { Image, Platform } from "react-native";
import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Detail from "../screens/Detail";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../componetns/MessagesLink";
import NavIcon from "../componetns/NavIcon";
import { stackStyles, cardStyles } from "./config";
import UserDetail from "../screens/UserDetail";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          headerTitle: "Explore"
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          headerTitle: navigation.getParam("username")
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: " ",
        headerTintColor: styles.blackColor,
        headerLeftContainerStyle: styles.LeftContainerStyle,
        headerStyle: {
          ...stackStyles
        },
        cardStyle: {
          ...cardStyles
        }
      }
    }
  );

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
      screen: stackFactory(Search),
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
        headerTitle: "Activity"
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
        headerTitle: "Profile",
        cardStyle: {
          backgroundColor: styles.greyColor
        },
        headerStyle: {
          backgroundColor: styles.greyColor,
          shadowOffset: {
            height: 0
          }
        }
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

import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles, cardStyles } from "./config";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

export default createStackNavigator(
  {
    Messages: {
      screen: Messages,
      navigationOptions: {
        headerBackTitle: " "
      }
    },
    Message: {
      screen: Message,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("username"),
        headerBackTitle: " "
      })
    },
    UserProfile: {
      screen: UserDetail,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("username"),
        headerBackTitle: " "
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Direct",
      headerBackTitle: "Cancel",
      headerBackTitleStyle: styles.backTitleStyle,
      headerLeftContainerStyle: styles.LeftContainerStyle,
      headerTintColor: styles.blackColor,
      headerStyle: {
        ...stackStyles
      },
      cardStyle: {
        ...cardStyles
      }
    }
  }
);

import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles, cardStyles } from "./config";
import styles from "../styles";

export default createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Direct",
      headerBackTitle: "Cancel",
      headerBackTitleStyle: styles.backTitleStyle,
      headerLeftContainerStyle: styles.LeftContainerStyle,
      headerBackImage: () => null,
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

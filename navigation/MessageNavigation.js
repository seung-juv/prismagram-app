import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles, cardStyles } from "./config";

export default createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerLeft: () => null,
      headerStyle: {
        ...stackStyles
      },
      cardStyle: {
        ...cardStyles
      }
    }
  }
);

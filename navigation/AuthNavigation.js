import { createAppContainer } from "react-navigation";
import { createStackNavigator, CardStyleInterpolators } from "react-navigation-stack";
import AuthHome from "../screens/Auth/AuthHome";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import { cardStyles } from "./config";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Signup,
    Login,
    Confirm
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyle: {
        ...cardStyles
      }
    }
  }
);

export default createAppContainer(AuthNavigation);

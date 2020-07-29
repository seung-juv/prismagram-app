import React, { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

export default Component => {
  return class extends React.Component {
    render() {
      const { navigation } = this.props;
      return (
        <Suspense
          fallback={
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator />
            </View>
          }
        >
          <Component navigation={navigation} />
        </Suspense>
      );
    }
  };
};

import * as React from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";
import { RootStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import SplashScreen from "screens/SplashScreen";
import FinanceaNavigator from "./FinanceNavigator";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const themes = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <View
        style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}
      >
        <Stack.Navigator
          initialRouteName={"SplashScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Finance" component={FinanceaNavigator} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MainNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { LogBox } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";
LogBox.ignoreAllLogs();

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="inverted" />
    </Provider>
  );
}

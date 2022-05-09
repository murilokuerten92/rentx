import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Mycars } from "../screens/Mycars";
import { Home } from "../screens/Home";
import { AppStackRoutes } from "./app.stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MyCars" component={Mycars} />
    </Navigator>
  );
}

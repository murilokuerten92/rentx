import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Mycars } from "../screens/Mycars";
import { Home } from "../screens/Home";
import { AppStackRoutes } from "./app.stack.routes";
import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";
import PeopleSvg from "../assets/people.svg";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
      initialRouteName="Home"
    >
      <Screen
        options={{
          tabBarIcon: ({ color }) => <HomeSvg width={24} height={24} fill={color} />,
        }}
        name="Home"
        component={AppStackRoutes}
      />
      <Screen
        options={{
          tabBarIcon: ({ color }) => <CarSvg width={24} height={24} fill={color}  />,
        }}
        name="Profile"
        component={Home}
      />
      <Screen
        options={{
          tabBarIcon: ({ color }) => <PeopleSvg width={24} height={24} fill={color}  />,
        }}
        name="MyCars"
        component={Mycars}
      />
    </Navigator>
  );
}

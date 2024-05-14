import React from "react";
import { StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../assets/styles/appColors";
import MainScreen from "./MainScreen";
import RoutineScreen from "./RoutineScreen";

const Tab = createBottomTabNavigator();

const Body = () => {
  const HomeTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons
          name={"file-tray-full"}
          size={30}
          color={appColors.greenishWhite}
        />
      ),
    };
  };

  const QRTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons name={"logo-github"} size={30} color={appColors.green} />
      ),
    };
  };

  const tabNavigatorScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarInactiveTintColor: appColors.darkGreen,
    tabBarActiveTintColor: appColors.darkGreen,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: appColors.black,
    },
  };

  return (
    <View style={styles.appBody}>
      <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={HomeTabOptions}
        />
        <Tab.Screen
          name="QR"
          component={RoutineScreen}
          options={QRTabOptions}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  appBody: {
    flex: 20,
  },
});

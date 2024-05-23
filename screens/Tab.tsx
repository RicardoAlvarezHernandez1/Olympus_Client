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
import NewsScreen from "./NewsScreen";
import AchievementScreen from "./AchievementsScreen";

// Create a bottom tab navigator instance
const Tab = createBottomTabNavigator();
// Define the Body component
const Body = () => {
  // Function to define options for the Home tab
  const HomeTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons name={"home-outline"} size={30} color={appColors.darkGreen} />
      ),
    };
  };

  // Function to define options for the Routines tab
  const RoutinesTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons
          name={"barbell-outline"}
          size={30}
          color={appColors.darkGreen}
        />
      ),
    };
  };

  // Function to define options for the News tab
  const NewsTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons
          name={"newspaper-outline"}
          size={30}
          color={appColors.darkGreen}
        />
      ),
    };
  };

  // Function to define options for the Achievements tab
  const AchievementsTabOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarIcon: () => (
        <Ionicons
          name={"medal-outline"}
          size={30}
          color={appColors.darkGreen}
        />
      ),
    };
  };

  // Common options for all tabs
  const tabNavigatorScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarInactiveTintColor: appColors.darkGreen,
    tabBarActiveTintColor: appColors.greenishWhite,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: appColors.black,
    },
  };
  // Component rendering
  return (
    <View style={styles.appBody}>
      <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={HomeTabOptions}
        />
        <Tab.Screen
          name="Routines"
          component={RoutineScreen}
          options={RoutinesTabOptions}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={NewsTabOptions}
        />
        <Tab.Screen
          name="Achievements"
          component={AchievementScreen}
          options={AchievementsTabOptions}
        />
      </Tab.Navigator>
    </View>
  );
};

// Export the component
export default Body;

// Styles for the Tab component
const styles = StyleSheet.create({
  appBody: {
    flex: 20,
  },
});

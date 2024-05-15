import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
//import CustomHeader from './CustomHeader';

import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../assets/styles/appColors";
import { UserContext } from "../context/UserContext";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RoutineScreen from "../screens/RoutineScreen";
import MainScreen from "../screens/MainScreen";
import Tab from "../screens/Tab";
import CreateWorkOutScreen from "../screens/CreateWorkOutScreen";
import MusclesScreen from "../screens/MusclesScreen";
import ExerciseScreen from "../screens/Exercises";
import WorkoutScreen from "../screens/WorkoutScreen";
import ExercisesScreen from "../screens/ExercisesScreen";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const { isLogged, toggleIsLogged } = React.useContext(UserContext);

  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitle: "OLYMPUS",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: appColors.lightGreen,
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerActiveTintColor: "darkblue",
    drawerActiveBackgroundColor: appColors.green,
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: appColors.greenishWhite,
    drawerType: "front",
  };

  return (
    <>
      {isLogged ? (
        <>
          <Drawer.Navigator
            initialRouteName="Tabs"
            screenOptions={drawerNavigatorScreenOptions}
          >
            <Drawer.Screen
              name="Main"
              component={MainScreen}
              options={{
                drawerIcon: () => (
                  <Ionicons name={"home-outline"} size={25} color={"black"} />
                ),
              }}
            />
            <Drawer.Screen
              name="Workouts"
              component={RoutineScreen}
              options={{
                drawerIcon: () => (
                  <Ionicons
                    name={"barbell-outline"}
                    size={25}
                    color={"black"}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name="CreateWorkout"
              component={CreateWorkOutScreen}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
            <Drawer.Screen
              name="Muscles"
              component={MusclesScreen}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
            <Drawer.Screen
              name="Exercises"
              component={ExerciseScreen}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
            <Drawer.Screen
              name="Workout"
              component={WorkoutScreen}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
            <Drawer.Screen
              name="Exercise"
              component={ExercisesScreen}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
            <Drawer.Screen
              name="Tabs"
              component={Tab}
              options={{
                drawerLabel: () => null,
                title: "",
                drawerIcon: () => null,
              }}
            />
          </Drawer.Navigator>
        </>
      ) : (
        <Drawer.Navigator
          initialRouteName="Welcome"
          screenOptions={drawerNavigatorScreenOptions}
        >
          <Drawer.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name={"home-outline"} size={25} color={"black"} />
              ),
            }}
          />

          <Drawer.Screen
            name="Registration"
            component={RegisterScreen}
            options={{
              drawerIcon: () => (
                <Ionicons
                  name={"person-add-outline"}
                  size={25}
                  color={"black"}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name={"arrow-redo-sharp"} size={25} color={"black"} />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
};

export default CustomDrawer;

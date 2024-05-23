import React from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../assets/styles/appColors";
import { UserContext } from "../context/UserContext";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RoutineScreen from "../screens/RoutineScreen";
import Tab from "../screens/Tab";
import CreateWorkOutScreen from "../screens/CreateWorkOutScreen";
import MusclesScreen from "../screens/MusclesScreen";
import ExerciseScreen from "../screens/Exercises";
import WorkoutScreen from "../screens/WorkoutScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import NewsScreen from "../screens/NewsScreen";
import AchievementScreen from "../screens/AchievementsScreen";

const Drawer = createDrawerNavigator(); // Creating a Drawer Navigator

const CustomDrawer = () => {
  const { isLogged } = React.useContext(UserContext); // Using UserContext for user authentication

  // Options for drawer navigation
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitle: "OLYMPUS", // Title for the header
    headerTitleAlign: "center", // Aligning header title to center
    headerStyle: {
      backgroundColor: appColors.lightGreen, // Setting header background color
    },
    headerTintColor: "black", // Setting header text color
    drawerItemStyle: {
      width: "100%", // Setting drawer item width
    },
    drawerActiveTintColor: "darkblue", // Setting active item text color
    drawerActiveBackgroundColor: appColors.green, // Setting active item background color
    drawerInactiveTintColor: "black", // Setting inactive item text color
    drawerInactiveBackgroundColor: appColors.greenishWhite, // Setting inactive item background color
    drawerType: "front", // Setting drawer type
  };

  return (
    // Depending on whether you are logged in or not, the necessary screens will be displayed.
    <>
      {isLogged ? (
        <>
          <Drawer.Navigator
            initialRouteName="Tabs"
            screenOptions={drawerNavigatorScreenOptions}
          >
            <Drawer.Screen
              name="Welcome"
              component={Tab}
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
              name="News"
              component={NewsScreen}
              options={{
                drawerIcon: () => (
                  <Ionicons
                    name={"newspaper-outline"}
                    size={25}
                    color={"black"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Achievements"
              component={AchievementScreen}
              options={{
                drawerIcon: () => (
                  <Ionicons name={"medal-outline"} size={25} color={"black"} />
                ),
              }}
            />
            <Drawer.Screen
              name="CreateWorkout"
              component={CreateWorkOutScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Muscles"
              component={MusclesScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Exercises"
              component={ExerciseScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Workout"
              component={WorkoutScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Exercise"
              component={ExercisesScreen}
              options={{
                drawerItemStyle: { height: 0 },
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

export default CustomDrawer; // Exporting CustomDrawer component

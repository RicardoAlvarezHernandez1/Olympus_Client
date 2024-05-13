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
            initialRouteName="WelcomeUser"
            screenOptions={drawerNavigatorScreenOptions}
          >
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
                <Ionicons
                  name={"person-add-outline"}
                  size={25}
                  color={"black"}
                />
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
        </Drawer.Navigator>
      )}
    </>
  );
};

export default CustomDrawer;

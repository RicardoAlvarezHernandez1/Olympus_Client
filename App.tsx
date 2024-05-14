import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import CustomDrawer from "./components/CustomDrawer";
import appColors from "./assets/styles/appColors";
import UserProvider from "./providers/UserProvider";
import MuscleProvider from "./providers/MuscleProvider";
import RoutineProvider from "./providers/RoutineProvider";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <UserProvider>
        <MuscleProvider>
          <RoutineProvider>
            <NavigationContainer>
              <CustomDrawer></CustomDrawer>
            </NavigationContainer>
          </RoutineProvider>
        </MuscleProvider>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

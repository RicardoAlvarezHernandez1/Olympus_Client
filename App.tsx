import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import CustomDrawer from "./components/CustomDrawer";
import appColors from "./assets/styles/appColors";
import UserProvider from "./providers/UserProvider";
import MuscleProvider from "./providers/MuscleProvider";
import RoutineProvider from "./providers/RoutineProvider";
import ExerciseProvider from "./providers/ExerciseProvider";

// Main Component for the app
export default function App() {
  return (
    <View style={styles.appContainer}>
      <UserProvider>
        <MuscleProvider>
          <RoutineProvider>
            <ExerciseProvider>
              <NavigationContainer>
                <CustomDrawer></CustomDrawer>
              </NavigationContainer>
            </ExerciseProvider>
          </RoutineProvider>
        </MuscleProvider>
      </UserProvider>
    </View>
  );
}

// Styles for the main component
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: appColors.white,
  },
});

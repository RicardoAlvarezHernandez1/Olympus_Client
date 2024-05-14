import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { getUserRoutines } from "../services/OlympusClientServices";
import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import appColors from "../assets/styles/appColors";

type MainScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>WELCOME</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Achievements")}
          >
            <ImageBackground
              style={styles.image}
              source={require("../assets/images/Fondo_Olympus_Client.png")}
            >
              <Text style={styles.buttonText}>Your Achievements</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Workouts")}
          >
            <ImageBackground
              style={styles.image}
              source={require("../assets/images/Fondo_Olympus_Client.png")}
            >
              <Text style={styles.buttonText}>Your Workouts</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  welcomeTitle: {
    fontWeight: "700",
    fontSize: 45,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
    color: AppColors.white,
    marginTop: -80,
    marginBottom: 60,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 5,
  },
  welcomeContainer: {
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
  },
  buttonText: {
    color: appColors.white,
    fontWeight: "700",
    fontSize: 20,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 16,
  },
  touchable: {
    height: 150,
    width: 240,
  },
});

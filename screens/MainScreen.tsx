import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import appColors from "../assets/styles/appColors";

type MainScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  const { user } = React.useContext(UserContext);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.backgroundImage}
      >
        <Text style={styles.welcomeTitle}>Welcome {user}</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Achievements")}
          >
            <ImageBackground
              style={styles.image}
              source={require("../assets/images/achievementsButton.jpg")}
              imageStyle={styles.imageBorder}
            >
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Your Achievements</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Routines")}
          >
            <ImageBackground
              style={styles.image}
              source={require("../assets/images/workouts.jpg")}
              imageStyle={styles.imageBorder}
            >
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Your Workouts</Text>
              </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
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
    marginTop: -20,
    marginBottom: 40,
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
    paddingVertical: 20,
  },
  touchable: {
    height: 150,
    width: 240,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBorder: {
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
  },
  buttonText: {
    color: appColors.white,
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
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
});

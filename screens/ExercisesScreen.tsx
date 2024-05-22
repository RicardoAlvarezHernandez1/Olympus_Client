import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { getExercisesById } from "../services/OlympusClientServices";
import { RoutineContext } from "../context/RoutineContext";
import { ExerciseContext } from "../context/ExerciseContext";

type ExerciseScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const ExercisesScreen = ({ navigation }: ExerciseScreenProps) => {
  const { exerciseId } = React.useContext(ExerciseContext);
  const { routineName } = React.useContext(RoutineContext);
  const [exerciseName, setExerciseName] = React.useState("");
  const [exerciseDescription, setExerciseDescription] = React.useState("");
  const [urlImage, setUrlImage] = React.useState("");

  const loadExercise = async () => {
    getExercisesById(exerciseId).then((data) => {
      setExerciseName(data.exerciseName);
      setExerciseDescription(data.exerciseDescription);
      setUrlImage(data.urlImage);
    });
  };

  React.useEffect(() => {
    loadExercise();
  }, [exerciseId]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>{routineName}</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <View style={styles.tittleContainer}>
            <Ionicons
              name={"arrow-undo-circle-outline"}
              size={25}
              color={"black"}
              style={styles.icono}
              onPress={() => navigation.navigate("Workout")}
            />
            <Text style={styles.tittle}>{exerciseName}</Text>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.image}
              source={{ uri: urlImage }}
            ></ImageBackground>
          </View>
          <View>
            <Text style={styles.description}>{exerciseDescription}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ExercisesScreen;

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
  imageContainer: {
    width: 250,
    height: 200,
  },
  tittleContainer: {
    flexDirection: "row",
  },
  icono: {
    marginRight: 20,
  },
  welcomeTitle: {
    fontWeight: "700",
    fontSize: 45,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
    color: AppColors.white,
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    width: 200,
  },
  inputStyle: {
    width: 250,
    height: 50,
    backgroundColor: AppColors.limeGreen,
    borderRadius: 10,
    marginTop: 20,
  },
  welcomeContainer: {
    width: 300,
    height: 580,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
  },
  buttonContent: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  tittle: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
  },
  touchable: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: AppColors.green,
    alignItems: "center",
  },
  goBack: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.darkGreen,
    alignItems: "center",
    alignSelf: "center",
    width: 100,
  },
  login: {
    marginTop: 10,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: AppColors.darkGreen,
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

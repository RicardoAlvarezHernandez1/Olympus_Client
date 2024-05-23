import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { getExercisesById } from "../services/OlympusClientServices";
import { RoutineContext } from "../context/RoutineContext";
import { ExerciseContext } from "../context/ExerciseContext";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define the props for the ExercisesScreen component
type ExerciseScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

// ExerciseScreen component
const ExercisesScreen = ({ navigation }: ExerciseScreenProps) => {
  // Retrieve exerciseId from ExerciseContext
  const { exerciseId } = React.useContext(ExerciseContext);
  // Retrieve routineName from RoutineContext
  const { routineName } = React.useContext(RoutineContext);
  // State to hold exercise details
  const [exerciseName, setExerciseName] = React.useState("");
  const [exerciseDescription, setExerciseDescription] = React.useState("");
  const [urlImage, setUrlImage] = React.useState("");

  // Function to load exercise details
  const loadExercise = async () => {
    getExercisesById(exerciseId).then((data) => {
      setExerciseName(data.exerciseName);
      setExerciseDescription(data.exerciseDescription);
      setUrlImage(data.urlImage);
    });
  };

  // Load exercise details when exerciseId changes
  React.useEffect(() => {
    loadExercise();
  }, [exerciseId]);

  // Return ExercisesScreen
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.image}
      >
        <Text style={styles.workoutTitle}>{routineName}</Text>
        <View style={{ ...styles.boxShadow, ...styles.exerciseContainer }}>
          <View style={styles.titleContainer}>
            <Ionicons
              name={"arrow-undo-circle-outline"}
              size={25}
              color={"black"}
              style={styles.icon}
              onPress={() => navigation.navigate("Workout")}
            />
            <Text style={styles.title}>{exerciseName}</Text>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.image}
              source={
                urlImage
                  ? { uri: urlImage }
                  : require("./../assets/images/loader2.gif")
              }
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

// Export the component
export default ExercisesScreen;

// Styles for the ExercisesScreen component
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
  titleContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 20,
  },
  workoutTitle: {
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
  exerciseContainer: {
    width: 300,
    height: 580,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
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

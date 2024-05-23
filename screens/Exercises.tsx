import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  addExerciseToRoutine,
  getExercisesByMuscleZone,
} from "../services/OlympusClientServices";
import { MuscleContext } from "../context/MuscleContext";
import { ExerciseInterface } from "../assets/interfaces/ExerciseInterface";
import { RoutineContext } from "../context/RoutineContext";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define the props for the ExerciseScreen component
type ExerciseScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

// Exercises component
const ExerciseScreen = ({ navigation }: ExerciseScreenProps) => {
  // State to hold the exercises for the selected muscle zone
  const [exercises, setExercises] = React.useState<ExerciseInterface[]>([]);
  // Retrieve the muscle zone ID and name from the MuscleContext
  const { muscleZoneId, muscleName } = React.useContext(MuscleContext);
  // Retrieve the routine ID from the RoutineContext
  const { routineId } = React.useContext(RoutineContext);

  // Function to load exercises for the selected muscle zone
  const loadExercises = async () => {
    const receivedExercises = await getExercisesByMuscleZone(muscleZoneId);
    if (receivedExercises) {
      setExercises(receivedExercises);
    }
  };

  // Load exercises when the muscle zone ID changes
  React.useEffect(() => {
    loadExercises();
  }, [muscleZoneId]);

  // Function to handle the button click to add exercise to routine
  /**
   * Add an exercise to the current workout routine.
   * @param id - ID of the exercise.
   * @param name - Name of the exercise.
   */
  const onClickButton = (id: number, name: string) => {
    addExerciseToRoutine(id, routineId)
      .then((status) => {
        if (status == 400) {
          window.alert("ERROR");
          return null;
        } else {
          window.alert(`${name} succesfully added to your workout routine`);
        }
      })
      .catch((err) => console.log(err));
  };

  // Return Exercises
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.backgroundImage}
      >
        <Text style={styles.muscleTitle}>{muscleName} exercises</Text>
        <View style={{ ...styles.boxShadow, ...styles.exercisesContainer }}>
          <ScrollView>
            {exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.exerciseId}
                style={{ ...styles.touchable, ...styles.boxShadow }}
                onPress={() =>
                  onClickButton(exercise.exerciseId, exercise.exerciseName)
                }
              >
                <Text style={styles.buttonContent}>
                  {exercise.exerciseName}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.navigate("Muscles")}
            >
              <Text style={styles.buttonContent}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.goBack, width: 200 }}
              onPress={() => navigation.navigate("Routines")}
            >
              <Text style={styles.buttonContent}>Return to workouts</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the component
export default ExerciseScreen;

// Styles for the Exercises component
const styles = StyleSheet.create({
  mainContainer: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  muscleTitle: {
    fontWeight: "700",
    fontSize: 45,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
    color: AppColors.white,
    marginBottom: 60,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 5,
  },
  exercisesContainer: {
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
  },
  buttonContent: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
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

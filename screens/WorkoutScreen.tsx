import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  getExercisesByWorkout,
  removeExerciseFromRoutine,
} from "../services/OlympusClientServices";
import { ExerciseInterface } from "../assets/interfaces/ExerciseInterface";
import { RoutineContext } from "../context/RoutineContext";
import { ExerciseContext } from "../context/ExerciseContext";
import { Ionicons } from "@expo/vector-icons";
import appColors from "../assets/styles/appColors";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define the props for the WorkoutScreen component
type WorkoutScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

// WorkoutScreen component
const WorkoutScreen = ({ navigation }: WorkoutScreenProps) => {
  // State to hold exercises
  const [exercises, setExercises] = React.useState<ExerciseInterface[]>([]);
  // Retrieve routine id, routine name, and set routine id from RoutineContext
  const { routineId, setRoutineId, routineName } =
    React.useContext(RoutineContext);
  // Retrieve exercise id from ExerciseContext
  const { setExerciseId } = React.useContext(ExerciseContext);
  // Function to load exercises
  const loadExercises = async () => {
    const recievedExercises = await getExercisesByWorkout(routineId);
    if (recievedExercises) {
      setExercises(recievedExercises);
    }
  };

  // Load exercises on component mount
  React.useEffect(() => {
    loadExercises();
  }, [exercises]);

  // Function to handle button click to view exercise details
  const onClickButton = (id: number) => {
    setExerciseId(id);
    navigation.navigate("Exercise");
  };

  // Function to add exercise
  const addExercise = () => {
    setRoutineId(routineId);
    navigation.navigate("Muscles");
  };

  // Function to remove exercise
  const removeExercise = (id: number) => {
    removeExerciseFromRoutine(id, routineId);
    loadExercises();
    window.alert("Exercise deleted successfully");
  };

  // Return WorkoutScreen
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.image}
      >
        <Text style={styles.yourWorkoutTitle}>Your Workout {routineName}</Text>
        <View style={{ ...styles.boxShadow, ...styles.workoutContainer }}>
          <TouchableOpacity style={styles.add} onPress={() => addExercise()}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={appColors.white}
            />
          </TouchableOpacity>
          <ScrollView>
            {exercises.map((exercise) => (
              <View key={exercise.exerciseId}>
                <TouchableOpacity
                  onPress={() => onClickButton(exercise.exerciseId)}
                  style={{ ...styles.touchable, ...styles.boxShadow }}
                >
                  <Text style={styles.buttonContent}>
                    {exercise.exerciseName}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="trash-outline"
                      size={30}
                      onPress={(e) => {
                        e.stopPropagation();
                        removeExercise(exercise.exerciseId);
                      }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.navigate("Workouts")}
            >
              <Text style={styles.buttonContent}>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the component
export default WorkoutScreen;

// Styles for the WorkoutScreen component
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
  yourWorkoutTitle: {
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
  workoutContainer: {
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
  add: {
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
    justifyContent: "space-between",
    width: 250,
    flexDirection: "row",
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

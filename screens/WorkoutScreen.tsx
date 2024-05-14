import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import {
  getExercisesByWorkout,
  getMusclesZones,
  getUserRoutines,
} from "../services/OlympusClientServices";
import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import { MuscleZoneInterface } from "../assets/interfaces/MuscleZoneInterface";
import { MuscleContext } from "../context/MuscleContext";
import { ExerciseInterface } from "../assets/interfaces/ExerciseInterface";
import { RoutineContext } from "../context/RoutineContext";

type MuscleScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const WorkoutScreen = ({ navigation }: MuscleScreenProps) => {
  const [exercises, setExercises] = React.useState<ExerciseInterface[]>([]);
  const { routineId } = React.useContext(RoutineContext);

  const loadExercises = async () => {
    const recievedExercises = await getExercisesByWorkout(routineId);
    console.log(recievedExercises);
    console.log(routineId);

    if (recievedExercises != null) {
      setExercises(recievedExercises);
    }
  };

  React.useEffect(() => {
    loadExercises();
  }, []);

  const onClickButton = (id: number) => {
    //setMuscleZoneId(id);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>YOUR WORKOUTS</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <ScrollView>
            {exercises.map((exercise) => (
              <TouchableOpacity
                style={{ ...styles.touchable, ...styles.boxShadow }}
              >
                <Text style={styles.buttonContent}>
                  {exercise.exerciseName}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => navigation.navigate("CreateWorkout")}
            >
              <Text>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WorkoutScreen;

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
    marginBottom: 60,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
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
  touchable: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 82,
    paddingVertical: 15,
    backgroundColor: AppColors.green,
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

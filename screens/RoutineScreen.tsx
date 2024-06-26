import { StyleSheet, Text, View, ImageBackground, Alert } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import {
  getUserRoutines,
  removeRoutine,
} from "../services/OlympusClientServices";
import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import { RoutineContext } from "../context/RoutineContext";
import appColors from "../assets/styles/appColors";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define the props for the RoutineScreen component
type RoutineScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

// RoutineScreen component
const RoutineScreen = ({ navigation }: RoutineScreenProps) => {
  // State to hold the list of routines
  const [routines, setRoutines] = React.useState<RoutineInterface[]>([]);
  // Retrieve user and routine context
  const { userId } = React.useContext(UserContext);
  const { setRoutineId, setRoutineName } = React.useContext(RoutineContext);

  // Function to load the user's routines
  /**
   * Load the routines for the current user.
   */
  const loadRoutines = async () => {
    const recievedUsers = await getUserRoutines(userId);
    if (recievedUsers != null) {
      setRoutines(recievedUsers);
    }
  };

  // UseFocusEffect to load routines when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadRoutines();
    }, [])
  );

  // UseEffect to load routines on component mount
  React.useEffect(() => {
    loadRoutines();
  }, []);

  // Function to handle the add button click
  /**
   * Navigate to the CreateWorkout screen and set a new routine ID.
   */
  const onclickButton = async () => {
    setRoutineId(routines.length + 1);
    navigation.navigate("CreateWorkout");
  };

  // Function to handle routine item click
  /**
   * Navigate to the Workout screen and set the routine ID and name.
   * @param id - ID of the routine.
   * @param name - Name of the routine.
   */
  const onclickRoutine = async (id: number, name: string) => {
    setRoutineId(id);
    setRoutineName(name);
    navigation.navigate("Workout");
  };

  // Function to handle routine removal
  /**
   * Confirm and remove the selected routine.
   * @param id - ID of the routine to be removed.
   * @param name - Name of the routine to be removed.
   */
  const onclickRemove = async (id: number, name: string) => {
    {
      Alert.alert(
        `Delete`,
        `Are you sure you want to delete the workout ${name}?`,
        [
          {
            text: "Confirm",
            onPress: () =>
              removeRoutine(id)
                .then((status) => {
                  if (status == 200) {
                    window.alert("Workout deleted succesfully");
                    loadRoutines();
                  } else {
                    window.alert(
                      `Error while trying to delete the workout ${name}`
                    );
                  }
                })
                .catch((err) => console.log(err)),
          },
          {
            text: "Cancel",
            onPress: () => window.alert("Deleted Cancelled"),
          },
        ]
      );
    }
  };

  // Return RoutineScreen
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.backgroundImage}
      >
        <Text style={styles.workoutsTitle}>YOUR WORKOUTS</Text>
        <View style={{ ...styles.boxShadow, ...styles.workoutsContainer }}>
          <TouchableOpacity style={styles.add} onPress={() => onclickButton()}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={appColors.white}
            />
          </TouchableOpacity>
          <ScrollView>
            {routines.map((routine) => (
              <View key={routine.routineId}>
                <TouchableOpacity
                  style={{ ...styles.touchable, ...styles.boxShadow }}
                  onPress={() =>
                    onclickRoutine(routine.routineId, routine.routineName)
                  }
                >
                  <Text style={styles.buttonContent}>
                    {routine.routineName}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="trash-outline"
                      size={30}
                      onPress={(e) => {
                        e.stopPropagation();
                        onclickRemove(routine.routineId, routine.routineName);
                      }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the component
export default RoutineScreen;
// Styles for the RoutineScreen component
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
  workoutsTitle: {
    fontWeight: "700",
    fontSize: 45,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
    color: AppColors.white,
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 5,
  },
  workoutsContainer: {
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
  add: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 62,
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
    paddingHorizontal: 62,
    paddingVertical: 15,
    backgroundColor: AppColors.green,
    alignItems: "center",
    width: 220,
    justifyContent: "space-between",
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

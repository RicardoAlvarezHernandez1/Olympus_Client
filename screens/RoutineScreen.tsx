import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import { getUserRoutines } from "../services/OlympusClientServices";
import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import { RoutineContext } from "../context/RoutineContext";
import appColors from "../assets/styles/appColors";

type WelcomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const RoutineScreen = ({ navigation }: WelcomeScreenProps) => {
  const [routines, setRoutines] = React.useState<RoutineInterface[]>([]);
  const { userId } = React.useContext(UserContext);
  const { setRoutineId, setRoutineName } = React.useContext(RoutineContext);
  const loadRoutines = async () => {
    console.log(userId);

    const recievedUsers = await getUserRoutines(userId);
    if (recievedUsers != null) {
      setRoutines(recievedUsers);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRoutines();
    }, [])
  );

  React.useEffect(() => {
    loadRoutines();
  }, []);

  const onclickButton = async () => {
    setRoutineId(routines.length + 1);
    navigation.navigate("CreateWorkout");
  };

  const onclickRoutine = async (id: number, name: string) => {
    setRoutineId(id);
    setRoutineName(name);

    navigation.navigate("Workout");
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>YOUR WORKOUTS</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => onclickButton()}
          >
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={appColors.white}
            />
          </TouchableOpacity>
          <ScrollView>
            {routines.map((routine) => (
              <TouchableOpacity
                key={routine.routineId}
                style={{ ...styles.touchable, ...styles.boxShadow }}
                onPress={() =>
                  onclickRoutine(routine.routineId, routine.routineName)
                }
              >
                <Text style={styles.buttonContent}>{routine.routineName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RoutineScreen;

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
    fontSize: 16,
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

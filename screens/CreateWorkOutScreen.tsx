import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { newRoutine } from "../services/OlympusClientServices";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define the props for the CreateWorkOutScreen component
type CreateWorkoutScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

// CreateWorkOutScreen component
const CreateWorkOutScreen = ({ navigation }: CreateWorkoutScreenProps) => {
  // State to hold the routine name
  const [routineName, setRoutineName] = React.useState("");
  // Retrieve the user ID from the UserContext
  const { userId } = React.useContext(UserContext);

  // Function to handle the create button click
  /**
   * Validate the input and create a new routine.
   * If successful, navigate to the Routines screen.
   */
  const onClickButton = () => {
    if (routineName.trim() == "") {
      window.alert("Please fill in the required fields");
    } else {
      newRoutine(userId, routineName)
        .then((status) => {
          if (status == 400) {
            window.alert("ERROR");
            return null;
          } else {
            navigation.navigate("Routines");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Return CreateWorkoutScreen
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.backgroundImage}
      >
        <View style={{ ...styles.boxShadow, ...styles.createWorkoutContainer }}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            onChangeText={(text) => setRoutineName(text)}
            placeholder="Your routine name..."
            style={styles.inputStyle}
          ></TextInput>
          <TouchableOpacity
            style={{ ...styles.touchable, ...styles.boxShadow }}
            onPress={() => onClickButton()}
          >
            <Text style={styles.buttonContent}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.touchable, ...styles.boxShadow }}
            onPress={() => navigation.navigate("Workouts")}
          >
            <Text style={styles.buttonContent}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the Component
export default CreateWorkOutScreen;

// Styles for the CreateWorkOutScreen component
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
  title: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 25,
  },
  inputStyle: {
    width: 250,
    height: 50,
    backgroundColor: AppColors.limeGreen,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  createWorkoutContainer: {
    width: 300,
    height: 380,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.90)",
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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

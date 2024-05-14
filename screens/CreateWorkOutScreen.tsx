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
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { loginUser, newRoutine } from "../services/OlympusClientServices";

type WelcomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const CreateWorkOutScreen = ({ navigation }: WelcomeScreenProps) => {
  const [routineName, setRoutineName] = React.useState("");
  const { setId } = React.useContext(UserContext);
  const { userId } = React.useContext(UserContext);

  const onClickButton = () => {
    if (routineName.trim() == "") {
      window.alert("Por favor , rellene los campos necesarios");
    } else {
      newRoutine(userId, routineName)
        .then((status) => {
          if (status == 400) {
            window.alert("ERROR");
            return null;
          } else {
            window.alert("Registro exitoso");
            navigation.navigate("Muscles");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <Text style={styles.description}>Name</Text>
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreateWorkOutScreen;

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
  description: {
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
  },
  welcomeContainer: {
    width: 300,
    height: 380,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.90)",
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.darkGreen,
  },
  login: {
    marginTop: 10,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.green,
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

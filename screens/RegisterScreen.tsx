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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { registerUser } from "../services/OlympusClientServices";

type WelcomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const RegisterScreen = ({ navigation }: WelcomeScreenProps) => {
  const { user, setUserName } = React.useContext(UserContext);
  const [userEmail, setuserEmail] = React.useState("");
  const [userPassword, setuserPassword] = React.useState("");
  const [userWeight, setUserWeight] = React.useState(0);
  const [userHeight, setUserHeight] = React.useState(0);
  const [isSuccesfull, setisSuccesfull] = React.useState(201);

  function setUser(text: string) {
    setUserName(text);
  }
  function setEmail(text: string) {
    setuserEmail(text);
  }
  function setPassword(text: string) {
    setuserPassword(text);
  }

  const onClickButton = (
    userName: string,
    userEmail: string,
    userPassword: string,
    userWeight: number,
    userHeight: number
  ) => {
    {
      if (userName == "" || userEmail == "" || userPassword == "") {
        window.alert("Por favor , rellene los campos necesarios");
      } else {
        registerUser(userName, userEmail, userPassword, userHeight, userWeight)
          .then((status) => {
            if (status == 400) {
              window.alert("Error : no se a podido registrar el usuario");
              return null;
            } else {
              window.alert("Registro exitoso");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <Text style={styles.description}>
            Oh , you don't have an account?
          </Text>
          <Text style={styles.description}>Create a new one below</Text>
          <TextInput
            onChangeText={(text) => setUser(text)}
            placeholder="Your user name..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholder="Email address..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="Password..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => setUserWeight(parseFloat(text))}
            placeholder="Your Weight..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => setUserHeight(parseFloat(text))}
            placeholder="Your Height..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity
            style={{ ...styles.touchable, ...styles.boxShadow }}
            onPress={() =>
              onClickButton(
                `${user}`,
                `${userEmail}`,
                `${userPassword}`,
                userWeight,
                userHeight
              )
            }
          >
            <Text style={styles.buttonContent}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

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
    paddingLeft: 10,
  },
  welcomeContainer: {
    width: 300,
    height: 600,
    alignItems: "center",
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

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
import { loginUser } from "../services/OlympusClientServices";

type WelcomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const LoginScreen = ({ navigation }: WelcomeScreenProps) => {
  const { isLogged, toggleIsLogged } = React.useContext(UserContext);
  const { user, setUserName, setId } = React.useContext(UserContext);
  const [mail, setMail] = React.useState("");
  const [userPassword, setuserPassword] = React.useState("");

  function setPassword(text: string) {
    setuserPassword(text);
  }

  const onClickButton = () => {
    const email: string = mail;
    const password: string = userPassword;
    if (email.trim() == "" || password.trim() == "") {
      window.alert("Por favor , rellene los campos necesarios");
    } else {
      loginUser(email, password)
        .then((response) => {
          if (!response.ok) {
            window.alert("El usuario o la contraseña son incorrectos");
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (!data) {
            return;
          }

          if (data.mailAndPasswordAreCorrect == true) {
            setId(data.userId);
            setUserName(data.userName);
            toggleIsLogged();
          } else {
            window.alert("El usuario o la contraseña son incorrectos");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud: ", error);
          window.alert("Usuario no registrado");
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <Text style={styles.description}>You already have an account?</Text>
          <Text style={styles.description}>Log in below</Text>
          <TextInput
            onChangeText={(text) => setMail(text)}
            placeholder="Your email address..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            onChangeText={(text) => setuserPassword(text)}
            placeholder="Password..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity
            style={{ ...styles.touchable, ...styles.boxShadow }}
            onPress={() => onClickButton()}
          >
            <Text style={styles.buttonContent}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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

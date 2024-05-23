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
import { loginUser } from "../services/OlympusClientServices";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

// Define props for the component
type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>; // Navigation prop for navigation
};
const LoginScreen = ({ navigation }: LoginScreenProps) => {
  // Destructuring context values
  const { toggleIsLogged } = React.useContext(UserContext);
  const { setUserName, setId } = React.useContext(UserContext);

  // State hooks for email and password input
  const [mail, setMail] = React.useState("");
  const [userPassword, setuserPassword] = React.useState("");

  // Function to handle the login button click
  /**
   * Handle the login button click.
   * Validates the email and password fields, calls the loginUser service,
   * and updates the context state if login is successful.
   * @returns void
   */
  const onClickButton = () => {
    const email: string = mail;
    const password: string = userPassword;
    if (email.trim() == "" || password.trim() == "") {
      window.alert("Please, fill in the required fields");
    } else {
      loginUser(email, password)
        .then((response) => {
          if (!response.ok) {
            window.alert("The user or password are incorrect");
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
            window.alert("The user or password are incorrect");
          }
        })
        .catch((error) => {
          console.error("Request error: ", error);
          window.alert("User not registered");
        });
    }
  };

  //LoginScreen component
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.loginContainer }}>
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

// Export the component
export default LoginScreen;
// Styles for the component
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
  loginContainer: {
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

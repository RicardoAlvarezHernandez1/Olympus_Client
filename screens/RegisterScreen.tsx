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
import { registerUser } from "../services/OlympusClientServices";
import {
  OLYMPUS_CLIENT_BACKGROUND_IMAGE,
  validateEmail,
} from "../constants/global.const";

type RegisterScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { user, setUserName } = React.useContext(UserContext);
  const [userEmail, setuserEmail] = React.useState("");
  const [userPassword, setuserPassword] = React.useState("");
  const [userWeight, setUserWeight] = React.useState(0);
  const [userHeight, setUserHeight] = React.useState(0);

  function setUser(text: string) {
    setUserName(text);
  }

  const onClickButton = (
    userName: string,
    userEmail: string,
    userPassword: string,
    userWeight: number,
    userHeight: number
  ) => {
    {
      if (
        userName.trim() == "" ||
        userEmail.trim() == "" ||
        userPassword.trim() == "" ||
        !userHeight ||
        !userWeight
      ) {
        window.alert("Please, fill in the required fields");
      } else if (validateEmail(userEmail)) {
        registerUser(userName, userEmail, userPassword, userHeight, userWeight)
          .then((status) => {
            if (status == 400) {
              window.alert("Error : user could not be registered");
              return null;
            } else {
              window.alert("Successful registration");
              navigation.navigate("Login");
            }
          })
          .catch((err) => console.log(err));
      } else {
        window.alert("Please enter a valid email address");
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.registerContainer }}>
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
            onChangeText={(text) => setuserEmail(text)}
            placeholder="Email address..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            onChangeText={(text) => setuserPassword(text)}
            placeholder="Password..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => setUserWeight(parseFloat(text))}
            placeholder="Your Weight..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => setUserHeight(parseFloat(text))}
            placeholder="Your Height..."
            style={styles.inputStyle}
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
  registerContainer: {
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

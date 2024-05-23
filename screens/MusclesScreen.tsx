import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getMusclesZones } from "../services/OlympusClientServices";
import { MuscleZoneInterface } from "../assets/interfaces/MuscleZoneInterface";
import { MuscleContext } from "../context/MuscleContext";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

type MuscleScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const MusclesScreen = ({ navigation }: MuscleScreenProps) => {
  const [muscleZones, setMuscleZones] = React.useState<MuscleZoneInterface[]>(
    []
  );
  const { setMuscleZoneId, setMuscleName } = React.useContext(MuscleContext);

  const loadMuscleZones = async () => {
    const recievedUsers = await getMusclesZones();
    if (recievedUsers != null) {
      setMuscleZones(recievedUsers);
    }
  };

  React.useEffect(() => {
    loadMuscleZones();
  }, []);

  const onClickButton = (id: number, name: string) => {
    setMuscleZoneId(id);
    setMuscleName(name);
    navigation.navigate("Exercises");
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.backgroundImage}
      >
        <Text style={styles.chooseAMuscleTitle}>Choose a muscle zone</Text>
        <View style={{ ...styles.boxShadow, ...styles.musclesContainer }}>
          <ScrollView>
            {muscleZones.map((muscleZone) => (
              <TouchableOpacity
                key={muscleZone.muscleZoneId}
                style={{ ...styles.touchable, ...styles.boxShadow }}
                onPress={() =>
                  onClickButton(muscleZone.muscleZoneId, muscleZone.muscleName)
                }
              >
                <Text style={styles.buttonContent}>
                  {muscleZone.muscleName}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.navigate("CreateWorkout")}
            >
              <Text style={styles.buttonContent}>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MusclesScreen;

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
  chooseAMuscleTitle: {
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
  musclesContainer: {
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
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: AppColors.green,
    alignItems: "center",
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

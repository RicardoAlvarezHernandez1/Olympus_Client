import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../assets/styles/appColors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getAchievementsByUser } from "../services/OlympusClientServices";
import { AchievementInterface } from "../assets/interfaces/AchievementInterface";
import { UserContext } from "../context/UserContext";
import appColors from "../assets/styles/appColors";

const AchievementScreen = () => {
  const [achievements, setAchievements] = React.useState<
    AchievementInterface[]
  >([]);
  const { userId } = React.useContext(UserContext);

  const loadAchievements = async () => {
    const receivedAchievements = await getAchievementsByUser(userId);
    if (receivedAchievements) {
      setAchievements(receivedAchievements);
    }
  };

  const imageMap = {
    "Complete 10 workouts in a month": require("../assets/images/achievement1.png"),
    "Lift 1000 pounds in total": require("../assets/images/achievement2.png"),
    "Run 10 miles in a week": require("../assets/images/achievement3.png"),
    "Attend 20 group classes": require("../assets/images/achievement4.png"),
    "Do 50 push-ups in a row": require("../assets/images/achievement5.png"),
    "Complete a marathon (100 km)": require("../assets/images/achievement6.png"),
    "Do 30 bicep curls in a row": require("../assets/images/achievement7.png"),
    "Reach a body fat percentage of 15%": require("../assets/images/achievement8.png"),
    "Bench press your body weight": require("../assets/images/achievement9.png"),
    "Complete 1000 squats in a month": require("../assets/images/achievement10.png"),
  };

  React.useEffect(() => {
    loadAchievements();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [])
  );
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/achievements.jpg")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>Your achievements</Text>
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <Image
            style={styles.trophy}
            source={require("../assets/images/trophy.png")}
          />
          <ScrollView>
            {achievements.map((achievement) => (
              <View
                key={achievement.achievementId}
                style={{ ...styles.touchable, ...styles.boxShadow }}
              >
                <View>
                  <Image
                    source={imageMap[achievement.achievementDescription]}
                    style={styles.icons}
                  />
                </View>
                <Text style={styles.buttonContent}>
                  {achievement.achievementDescription}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AchievementScreen;

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
  trophy: {},
  icons: {
    height: 50,
    width: 50,
    borderColor: appColors.darkGreen,
    borderWidth: 2,
    borderRadius: 20,
  },
  welcomeContainer: {
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  touchable: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: AppColors.white,
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

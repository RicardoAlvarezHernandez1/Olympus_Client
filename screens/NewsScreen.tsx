import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getNews } from "../services/OlympusClientServices";
import { NewsItem } from "../assets/interfaces/NewsInterface";

type WelcomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const NewsScreen = ({ navigation }: WelcomeScreenProps) => {
  const [news, setNews] = React.useState<NewsItem[]>([]);

  const loadNews = async () => {
    getNews()
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.articles) {
          return;
        }
        setNews(data.articles);
      })
      .catch((error) => {
        console.error("Error en la solicitud: ", error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadNews();
    }, [])
  );

  React.useEffect(() => {
    loadNews();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Client.png")}
        style={styles.image}
      >
        <Text style={styles.welcomeTitle}>FITNESS NEWS</Text>
        <View style={styles.welcomeContainer}>
          <ScrollView>
            {news.map((individualNews, index) => (
              <TouchableOpacity
                key={index}
                style={{ ...styles.touchable, ...styles.boxShadow }}
                onPress={() => Linking.openURL(individualNews.url)}
              >
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={{ uri: individualNews.urlToImage }}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <View style={styles.newsTitleContainer}>
                      <Text
                        style={{ ...styles.newsTitle, ...styles.boxShadow }}
                      >
                        {individualNews.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
                <Text></Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NewsScreen;

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
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
  },
  inputStyle: {
    width: 250,
    height: 50,
    backgroundColor: AppColors.limeGreen,
    borderRadius: 10,
    marginTop: 20,
  },
  welcomeContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContent: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  touchable: {
    width: 325,
    height: 160,
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
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
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 16,
  },
  newsTitleContainer: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    marginLeft: 40,
  },
  newsTitle: {
    textAlign: "center",
    color: AppColors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});

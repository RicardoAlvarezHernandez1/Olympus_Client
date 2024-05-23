import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../assets/styles/appColors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getNews } from "../services/OlympusClientServices";
import { NewsItem } from "../assets/interfaces/NewsInterface";
import { OLYMPUS_CLIENT_BACKGROUND_IMAGE } from "../constants/global.const";

type NewsScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const NewsScreen = ({ navigation }: NewsScreenProps) => {
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
        console.error("Request error: ", error);
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
        source={OLYMPUS_CLIENT_BACKGROUND_IMAGE}
        style={styles.backgroundImage}
      >
        <Text style={styles.Title}>FITNESS NEWS</Text>
        <View style={styles.newsContainer}>
          <ScrollView>
            {news.map((individualNews, index) => (
              <TouchableOpacity
                key={index}
                style={{ ...styles.touchable, ...styles.boxShadow }}
                onPress={() => Linking.openURL(individualNews.url)}
              >
                <ImageBackground
                  source={{ uri: individualNews.urlToImage }}
                  style={styles.imageBackground}
                  imageStyle={styles.imageBorder}
                >
                  <View style={styles.newsTitleContainer}>
                    <Text style={{ ...styles.newsTitle, ...styles.boxShadow }}>
                      {individualNews.title}
                    </Text>
                  </View>
                </ImageBackground>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  Title: {
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
  newsContainer: {
    width: "100%",
    height: 500,
    alignItems: "center",
  },
  touchable: {
    width: 325,
    height: 160,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBorder: {
    borderRadius: 15,
  },
  newsTitleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    alignItems: "center",
  },
  newsTitle: {
    textAlign: "center",
    color: AppColors.white,
    fontSize: 15,
    fontWeight: "700",
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
});

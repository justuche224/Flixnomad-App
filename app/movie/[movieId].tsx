import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ApiMovie, Item } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import LoadingScreen from "@/components/LoadingScreen";
import MovieList from "@/components/MovieList";
import { fetSingleMovie, newMovies } from "@/store";
import { Collapsible } from "@/components/Collapsible";
import * as WebBrowser from "expo-web-browser";

const { width, height } = Dimensions.get("window");

export default function MoviePage() {
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState(newMovies);
  const [movie, setMovie] = useState<ApiMovie | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { movieId } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const getMovie = async (movieId: string) => {
      setLoading(true);
      const response = await fetSingleMovie(movieId as string);
      if (response.data) {
        setMovie(response.data);
      } else {
        setError(response.error);
        console.error("Error fetching movie:", response.error);
      }
      setLoading(false);
    };
    getMovie(movieId as string);
  }, [movieId]);

  const handleRefresh = () => {
    const getMovie = async (movieId: string) => {
      setLoading(true);
      const response = await fetSingleMovie(movieId as string);
      if (response.data) {
        setMovie(response.data);
      } else {
        setError(response.error);
        console.error("Error fetching movie:", response.error);
      }
      setLoading(false);
    };
    getMovie(movieId as string);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          height: height / 1.5,
          width: width,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "HonkRegular",
            fontSize: 40,
            textAlign: "center",
            marginHorizontal: 16,
          }}
        >
          {error}
        </Text>
        <TouchableOpacity onPress={handleRefresh}>
          <FontAwesome name="refresh" size={44} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  if (!movie) {
    return (
      <View>
        <Text>Invalid movie data</Text>
      </View>
    );
  }

  const handleDownloadPress = () => {
    if (movie && movie.downloadLink && movie.downloadLink[0]) {
      // Linking.openURL(movie.downloadLink[0].link);
      WebBrowser.openBrowserAsync(movie.downloadLink[0].link);
    } else {
      alert("No download link available");
    }
  };
  const handlePlayPress = () => {
    if (movie && movie.downloadLink && movie.downloadLink[0]) {
      router.push({
        pathname: "/player",
        params: { url: movie.downloadLink[0].link, poster: movie.image },
      });
    } else {
      alert("No download link available");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1 }}
    >
      {/* back button and movie poster */}
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <SafeAreaView
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? 50 : 0,
            zIndex: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderRadius: 12,
              padding: 1,
            }}
          >
            <AntDesign color={"white"} name="arrowleft" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign color={"white"} name="heart" size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <LoadingScreen />
        ) : (
          <View>
            <Image
              source={{ uri: movie.image }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>
      {/* Movie details */}
      <View
        style={{
          marginTop: -(height * 0.09),
          gap: 4,
          backgroundColor: "black",
        }}
      >
        {/* Movie title */}
        <Text style={styles.title}>{movie.name}</Text>

        {/* Status, release date, runtime */}
        <Text style={styles.text}>{movie.runtime}</Text>

        {/* genres */}
        <Text style={styles.text}>
          {movie.genre.map((genre) => `${genre} `)}
        </Text>
        {/* description */}
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "left",
            fontStyle: "italic",
          }}
        >
          {movie.details}
        </Text>
        {/* Trailer */}
        <Collapsible title="Trailer">
          <View className=" justify-center items-center">
            <YoutubePlayer
              height={300}
              width={width - 50}
              videoId={"LFSpRNtxd8I"}
            />
          </View>
        </Collapsible>
        {/* Download and Play button */}
        <View className="gap-1 justify-center items-center flex-row">
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadPress}
          >
            <AntDesign name="download" size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Download
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handlePlayPress}
          >
            <AntDesign name="playcircleo" size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Watch
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-black">
        {/* Dummy */}
        <MovieList title="Related" data={latest} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  downloadButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: width / 2.25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderCurve: "continuous",
    backgroundColor: "red",

    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 5,
    paddingLeft: 5,
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 12,
    textAlign: "left",
    paddingLeft: 5,
  },
});

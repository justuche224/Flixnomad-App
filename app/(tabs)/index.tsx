import { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  View,
  Text,
  Dimensions,
} from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/TrendingMovies";
import MovieList from "@/components/MovieList";
import { fetchTrendingMovies, newMovies, trendingMovies } from "@/store";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import { ApiMovie } from "@/types"; // Import your type definition here
import Header from "@/components/Header";

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");

  const ios = Platform.OS == "ios";
  const [trending, setTrending] = useState<ApiMovie[]>([]);
  const [latest, setLatest] = useState(newMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    setLoading(true);
    const response = await fetchTrendingMovies();
    if (response.data) {
      setTrending(response.data.movies);
    } else {
      console.error("Error fetching trending movies:", response.error);
      setError(response.error);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    getTrendingMovies();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Header title="Flixnomad" />
      <StatusBar />
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {error ? (
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
          ) : (
            <>
              {/*Trending*/}
              <TrendingMovies data={trending} />

              {/* Upcoming */}
              <MovieList title="Latest" data={latest} />

              {/* Dummy */}
              <MovieList title="Top movies" data={latest} />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

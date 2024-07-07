import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/TrendingMovies";
import { fetchMovies, fetchTrendingMovies } from "@/store";
import LoadingScreen from "@/components/LoadingScreen";
import { ApiMovie } from "@/types";
import Header from "@/components/Header";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [trending, setTrending] = useState<ApiMovie[]>([]);
  const [latest, setLatest] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getTrendingMovies();
    getMovies(10);
  }, []);

  const getTrendingMovies = async () => {
    setLoading(true);
    const response = await fetchTrendingMovies();
    if (response.data) {
      setTrending(response.data);
    } else {
      console.error("Error fetching trending movies:", response.error);
      setError(response.error);
    }
    setLoading(false);
  };

  const getMovies = async (perPage: number) => {
    setLoading(true);
    const response = await fetchMovies(perPage);
    if (response.data) {
      setLatest(response.data.movies);
    } else {
      console.error("Error fetching movies:", response.error);
      setError(response.error);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    getTrendingMovies();
    getMovies(10);
  };

  const renderMovie = ({ item }: { item: ApiMovie }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        router.push({
          pathname: "/movie/[id]",
          params: { id: item._id },
        });
      }}
    >
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.image }} style={styles.movieImage} />
        <Text style={styles.movieTitle}>
          {item.name.length > 13 ? item.name.slice(0, 13) + "..." : item.name}
        </Text>
        <Text style={styles.movieInfo}>
          {item.year} | {item.rated} | {item.runtime}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderHeader = () => (
    <View>
      <TrendingMovies data={trending} />
      <Text style={styles.sectionTitle}>Latest Movies and TV Shows</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Flixnomad" />
      <StatusBar />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={latest}
          keyExtractor={(item) => item._id}
          renderItem={renderMovie}
          numColumns={3}
          contentContainerStyle={styles.listContentContainer}
          ListFooterComponent={<View style={{ height: 50 }} />}
        />
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRefresh}>
            <FontAwesome name="refresh" size={44} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  movieContainer: {
    margin: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  movieImage: {
    width: width * 0.3,
    height: height * 0.22,
    borderRadius: 4,
  },
  movieTitle: {
    color: "white",
    marginLeft: 5,
    marginTop: 5,
    fontSize: 12,
  },
  movieInfo: {
    color: "white",
    marginLeft: 5,
    marginTop: 5,
    fontSize: 9,
  },
  listContentContainer: {
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    height: height / 1.5,
    width: width,
  },
  errorText: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    marginHorizontal: 16,
  },
});

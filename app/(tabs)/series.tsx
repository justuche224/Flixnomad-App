import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiMovie } from "@/types";
import { fetchMoviesWithPagination } from "@/store";
import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

const { width, height } = Dimensions.get("window");

const Movies = () => {
  const ios = Platform.OS === "ios";
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 15;

  const loadMovies = async (pageNum: number) => {
    setLoading(true);
    const response = await fetchMoviesWithPagination(pageNum, perPage);
    setLoading(false);
    if (response.data) {
      setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
      setTotalPages(response.data.pagination.totalPages);
    } else if (response.error) {
      setError(response.error);
    }
  };

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadMovies(nextPage);
        return nextPage;
      });
    }
  };

  const renderMovie = ({ item }: { item: ApiMovie }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.image }} style={styles.movieImage} />
        <Text style={styles.movieTitle}>
          {item.name.length > 16 ? item.name.slice(0, 16) + "..." : item.name}
        </Text>
        <Text style={styles.movieInfo}>
          {item.year} | {item.rated} | {item.runtime}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            <Fontisto name="film" size={21} color="red" /> Series & TV Shows
          </Text>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <FontAwesome5 color="white" name="search" size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading && page === 1 ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item._id}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          numColumns={3}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#fff" /> : null
          }
          contentContainerStyle={styles.listContentContainer}
        />
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => loadMovies(1)}>
            <FontAwesome name="refresh" size={44} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  safeAreaView: {
    marginBottom: Platform.OS === "ios" ? -8 : null,
    marginTop: Platform.OS === "ios" ? null : 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
    fontSize: 14,
  },
  movieInfo: {
    color: "white",
    marginLeft: 5,
    marginTop: 5,
    fontSize: 12,
  },
  listContentContainer: {
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  errorText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 16,
  },
});

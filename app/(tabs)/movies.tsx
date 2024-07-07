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
  ScrollView,
  RefreshControl,
} from "react-native";
import { ApiMovie } from "@/types";
import { fetchGenres, fetchMoviesWithPagination } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Movies = () => {
  const ios = Platform.OS === "ios";
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [genre, setGenre] = useState<string[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 15;

  useEffect(() => {
    loadMovies(1);
    getGenres();
  }, []);

  const loadMovies = async (pageNum: number) => {
    setLoading(true);
    const response = await fetchMoviesWithPagination(pageNum, perPage);
    if (response.data && response.data.movies) {
      setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
      setTotalPages(response.data.pagination.totalPages);
    } else if (response.error) {
      setError(response.error);
    }
    setLoading(false);
  };

  const getGenres = async () => {
    const response = await fetchGenres();
    if (response.data) {
      setGenre(response.data.genres);
    } else {
      console.error(response.error);
    }
    setLoading(false);
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadMovies(nextPage);
        return nextPage;
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setMovies([]); // Clear the current list of movies
    setPage(1); // Reset page to 1
    await loadMovies(1);
    setRefreshing(false);
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

  return (
    <View style={styles.container}>
      <Header title="Movies" />
      <StatusBar />
      {loading && page === 1 ? (
        <LoadingScreen />
      ) : (
        <>
          <ScrollView
            horizontal
            style={{ marginVertical: 20, paddingHorizontal: 10, maxHeight: 50 }}
          >
            {genre &&
              genre.map((genre) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/genre/[genre]",
                      params: { genre: genre },
                    })
                  }
                  key={genre}
                  style={{
                    backgroundColor: "#302f2f",
                    paddingBottom: 10,
                    paddingHorizontal: 9,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                      lineHeight: 28,
                    }}
                  >
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
          {movies.length > 0 ? (
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
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-white">No movies found.</Text>
            </View>
          )}
        </>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              loadMovies(1);
              getGenres();
            }}
          >
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

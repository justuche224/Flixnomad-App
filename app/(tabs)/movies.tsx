import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiMovie } from "@/types";
import { fetchMoviesWithPagination } from "@/store";
import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

const Movies = () => {
  const ios = Platform.OS == "ios";
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

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
    <View style={styles.movieContainer}>
      <Text style={styles.movieTitle}>{item.name}</Text>
      {/* Add more movie details here */}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView
        style={{ marginBottom: ios ? -8 : null, marginTop: ios ? null : 16 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <Text className="text-2xl font-bold text-white">
            <Fontisto name="film" size={21} color="red" />
            Flixnomad
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
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#fff" /> : null
          }
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
      {error && (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
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
  movieContainer: {
    marginBottom: 10,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  movieTitle: {
    color: "white",
    fontSize: 18,
  },
});

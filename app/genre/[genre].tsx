import React, { useEffect, useState } from "react";
import { fetchGenre } from "@/store";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { ApiMovie, MoviesApiResponse } from "@/types";

const { width, height } = Dimensions.get("window");

const GenreList = () => {
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const { genre } = useLocalSearchParams();

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchGenre(genre as string);
      if (response.data && response.data.movies) {
        setMovies(response.data.movies);
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    getMovies();
  }, [genre]);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

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
      <Header title={`${genre} Movies`} />
      <StatusBar />
      <FlatList
        data={movies}
        keyExtractor={(item) => item._id}
        renderItem={renderMovie}
        numColumns={3}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

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
});

export default GenreList;

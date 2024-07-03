import React, { useEffect, useState } from "react";
import { fetchGenres } from "@/store";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const GenreList = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetchGenres();
      if (response.data) {
        setGenres(response.data.genres);
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    getGenres();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header title="Genres" />
      <StatusBar />
      <FlatList
        data={genres}
        style={{ marginTop: 20 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/genre/[genre]",
                params: { genre: item },
              })
            }
          >
            <View style={styles.genreItem}>
              <Text style={styles.genreText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
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
  genreItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  genreText: {
    fontSize: 18,
    color: "white",
  },
});

export default GenreList;

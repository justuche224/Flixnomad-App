import { useState } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  View,
  Text,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/TrendingMovies";
import MovieList from "@/components/MovieList";
import { newMovies, trendingMovies } from "@/store";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomeScreen() {
  const ios = Platform.OS == "ios";
  const [trending, setTrending] = useState(trendingMovies);
  const [latest, setLatest] = useState(newMovies);
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView
        style={{ marginBottom: ios ? -8 : null, marginTop: ios ? null : 16 }}
      >
        <StatusBar />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <FontAwesome6 color="white" name="bars-staggered" size={24} />
          <Text className="text-2xl font-bold text-white">
            <Fontisto name="film" size={21} color="red" />
            Flixnomad
          </Text>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <FontAwesome5 color="white" name="search" size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/*Trending*/}
          <TrendingMovies data={trending} />

          {/* Upcomming */}
          <MovieList title="Latest" data={latest} />

          {/* Dummy */}
          <MovieList title="Top movies" data={latest} />
        </ScrollView>
      )}
    </View>
  );
}

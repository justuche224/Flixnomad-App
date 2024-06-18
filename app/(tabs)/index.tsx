import { useState } from "react";
import { Image, TouchableOpacity, Platform, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/TrendingMovies";
import MovieList from "@/components/MovieList";
import { newMovies, trendingMovies } from "@/store";

export default function HomeScreen() {
  const ios = Platform.OS == "ios";
  const [trending, setTrending] = useState(trendingMovies);
  const [latest, setLatest] = useState(newMovies);

  return (
    <ThemedView className="flex-1">
      <SafeAreaView
        style={{ marginBottom: ios ? -8 : null, marginTop: ios ? null : 16 }}
      >
        <StatusBar />
        <ThemedView className="flex-row justify-between items-center mx-4">
          <ThemedText>
            <FontAwesome6 name="bars-staggered" size={24} />
          </ThemedText>
          <ThemedText className="text-2xl font-bold">
            <Fontisto name="film" size={21} color="red" />
            Flixnomad
          </ThemedText>
          <TouchableOpacity>
            <ThemedText>
              <FontAwesome5 name="search" size={20} />
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
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
    </ThemedView>
  );
}

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Item } from "@/types";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

export default function MoviePage() {
  const { movieId, movie } = useLocalSearchParams();
  const navigation = useNavigation();
  let movieObject: Item | undefined;
  if (typeof movie === "string") {
    try {
      movieObject = JSON.parse(movie);
      // Convert the string back to an object
    } catch (error) {
      console.error("Error parsing movie data:", error);
    }
  } else {
    console.error("Movie data is not a valid string:", movie);
  }

  if (!movieObject) {
    return (
      <View>
        <Text>Invalid movie data</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1 }}
    >
      {/* back button and movie poster */}
      <ThemedView className="w-full">
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
            <ThemedText>
              <AntDesign name="arrowleft" size={28} />
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedText>
              <AntDesign name="heart" size={24} />
            </ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={{ uri: movieObject.image }}
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
      </ThemedView>
      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09), gap: 4 }}>
        {/* Movie title */}
        <ThemedText className="text-white text-center text-3xl font-bold tracking-wider">
          {movieObject.name}
        </ThemedText>

        {/* Status, release date, runtime */}
        <ThemedText className="font-semibold text-base text-center">
          {movieObject.runtime}
        </ThemedText>

        {/* genres */}
        <ThemedText className="font-semibold text-base text-center">
          {`${movieObject.genre.genre1}  ${movieObject.genre.genre2}  ${movieObject.genre.genre3}`}
        </ThemedText>

        {/* description */}
        <ThemedText className="font-semibold tracking-wide mx-4 text-sm">
          {movieObject.details}
        </ThemedText>
      </View>
    </ScrollView>
  );
}

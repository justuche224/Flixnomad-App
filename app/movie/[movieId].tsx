import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Item } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import LoadingScreen from "@/components/LoadingScreen";
const [loading, setLoading] = useState(false);

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
      <View style={{ flex: 1, backgroundColor: "black" }}>
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
            <AntDesign color={"white"} name="arrowleft" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign color={"white"} name="heart" size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <LoadingScreen />
        ) : (
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
        )}
      </View>
      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09), gap: 4 }}>
        {/* Movie title */}
        <Text style={styles.title}>{movieObject.name}</Text>

        {/* Status, release date, runtime */}
        <Text style={styles.text}>{movieObject.runtime}</Text>

        {/* genres */}
        <Text style={styles.text}>
          {`${movieObject.genre.genre1}  ${movieObject.genre.genre2}  ${movieObject.genre.genre3}`}
        </Text>

        {/* Download button */}
        <TouchableOpacity style={styles.downloadButton}>
          <AntDesign name="download" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Download
          </Text>
        </TouchableOpacity>

        {/* description */}
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {movieObject.details}
        </Text>

        {/* Trailer */}
        <Text className="font-semibold tracking-wide mx-4 text-center my-4">
          Trailer
        </Text>
        <View>
          <YoutubePlayer height={300} width={width} videoId={"iee2TATGMyI"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  downloadButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderCurve: "continuous",
    backgroundColor: "red",
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 12,
    textAlign: "center",
  },
});

import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import axios from "axios";
import { ApiMovie } from "@/types";

const { width, height } = Dimensions.get("window");
const apiBaseUrl = "https://flixnomad-app-backend.vercel.app/api";
const searchEndpoint = `${apiBaseUrl}/search`;

const fetchSearchResults = async (searchTerm: string) => {
  // console.log(searchTerm);

  try {
    const response = await axios.get(searchEndpoint, {
      params: { searchTerm },
    });

    // console.log(response.data);

    return response.data.movies;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export default function SearchScreen() {
  const [results, setResults] = useState<ApiMovie[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const movies = await fetchSearchResults(searchTerm);
    setResults(movies);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-red-500 rounded-full">
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor={"lightgrey"}
          className="pb-1 pl-6 flex-1 font-semibold text-base text-white tracking-wider"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            borderRadius: 9999,
            padding: 12,
            margin: 4,
            backgroundColor: "red",
          }}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Results */}

      {loading ? (
        <LoadingScreen />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-2xl text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => router.push(`/movie/${item._id}`)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      borderRadius: 24,
                      width: width * 0.4,
                      height: height * 0.3,
                    }}
                  />
                  <Text className="text-base text-white ml-1">
                    {item.name.length > 20
                      ? item.name.slice(0, 17) + "..."
                      : item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Text className="text-lg text-white">No results found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

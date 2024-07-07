import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { ApiMovie } from "@/types";

const { width, height } = Dimensions.get("window");

interface MovieListProps {
  data: ApiMovie[];
  title: string;
}

const handleClick: (item: ApiMovie) => void = (item: ApiMovie) => {
  router.push({
    pathname: "/movie/[id]",
    params: { id: item._id, movie: JSON.stringify(item) },
  });
};

export default function MovieList({ title, data }: MovieListProps) {
  return (
    <View className="mb-8 space-y-4 bg-black">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-2xl text-white">{title}</Text>
        <TouchableOpacity style={{ display: "none" }}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: "black",
        }}
      >
        {data.map((item, index) => {
          let movieName = item.name;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClick(item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: item.image }}
                  style={{
                    borderRadius: 4,
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                />
                <Text className="ml-1 text-white">
                  {movieName.length > 12
                    ? movieName.slice(0, 12) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  seeMore: {
    color: "#007AFF",
    fontSize: 16,
    lineHeight: 24,
  },
});

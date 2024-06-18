import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import { router } from "expo-router";
import { Item, NewMovie } from "@/types";

const { width, height } = Dimensions.get("window");

interface MovieListProps {
  data: Item[];
  title: string;
}

const handleClick: (item: Item) => void = (item: Item) => {
  router.push({
    pathname: "/movie/[id]",
    params: { id: item._id, movie: JSON.stringify(item) },
  });
};

export default function MovieList({ title, data }: MovieListProps) {
  return (
    <ThemedView className="mb-8 space-y-4">
      <ThemedView className="mx-4 flex-row justify-between items-center">
        <ThemedText type="title" className="text-2xl">
          {title}
        </ThemedText>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </ThemedView>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          let movieName = item.name;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClick(item)}
            >
              <ThemedView className="space-y-1 mr-4">
                <Image
                  source={{ uri: item.image }}
                  style={{
                    borderRadius: 4,
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                />
                <ThemedText className="ml-1">
                  {movieName.length > 12
                    ? movieName.slice(0, 12) + "..."
                    : movieName}
                </ThemedText>
              </ThemedView>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  seeMore: {
    color: "#007AFF",
    fontSize: 16,
    lineHeight: 24,
  },
});

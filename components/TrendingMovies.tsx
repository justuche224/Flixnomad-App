import { TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  return (
    <ThemedView className="mb-0">
      <ThemedText className="text-lg mb-5 mx-4">Trending</ThemedText>
      <Carousel
        loop
        width={width * 0.6}
        height={height * 0.4}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <MovieCard item={item} />}
        onSnapToItem={(index) => console.log("current index:", index)}
      />
    </ThemedView>
  );
};

export default TrendingMovies;

const MovieCard = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require("../assets/images/react-logo.png")}
        style={{ width: width * 0.6, height: height * 0.4, borderRadius: 24 }}
      />
    </TouchableWithoutFeedback>
  );
};

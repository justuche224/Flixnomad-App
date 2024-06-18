import { TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";
import { Item } from "@/types";

const { width, height } = Dimensions.get("window");

interface TrendingProps {
  data: Item[];
}
interface MovieCardProps {
  item: Item;
  handleClick: () => void;
}

const TrendingMovies = ({ data }: TrendingProps) => {
  const handleClick: (item: Item) => void = (item: Item) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: item._id, movie: JSON.stringify(item) },
    });
  };

  return (
    <ThemedView className="mb-0">
      <Carousel
        loop
        width={width}
        height={height * 0.4}
        autoPlay={true}
        autoPlayInterval={5000}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </ThemedView>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }: MovieCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{ uri: item.image }}
        style={{ width: width, height: height * 0.4, borderRadius: 24 }}
      />
    </TouchableWithoutFeedback>
  );
};

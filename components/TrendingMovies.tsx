import {
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";
import { ApiMovie, Item } from "@/types";

const { width, height } = Dimensions.get("window");

interface TrendingProps {
  data: ApiMovie[];
}
interface MovieCardProps {
  item: ApiMovie;
  handleClick: () => void;
}

const TrendingMovies = ({ data }: TrendingProps) => {
  const handleClick: (item: ApiMovie) => void = (item: ApiMovie) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: item._id, movie: JSON.stringify(item) },
    });
  };

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={height * 0.6}
        autoPlay={true}
        autoPlayInterval={5000}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }: MovieCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{ uri: item.image }}
        style={{ width: width, height: height * 0.6 }}
      />
    </TouchableWithoutFeedback>
  );
};

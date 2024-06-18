import { TouchableWithoutFeedback, Dimemsions, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Carousel from "react-native-snap-carousel";

const TrendingMovies = ({ data }) => {
    const { width, height } = Dimemsions.get("window");

    return (
        <ThemedView className="mb-0">
            <ThemedText className="text-lg mb-5 mx-4">Trending</ThemedText>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} />}
                firstItem={1}
                inactiveOpacity={0.6}
                slider={600}
                itemWidth={400}
                slideStyle={{ display: "flex", alignItems: "center" }}
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
                style={{ width: width * 0.6, height: height * 0.4 }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    );
};

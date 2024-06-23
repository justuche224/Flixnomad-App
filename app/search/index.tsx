import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

export default function SearchScreen() {
    const { width, height } = Dimensions.get("window");
    const [results, setResults] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(false);

    let movieName = "House of Dragon season 1 & 2";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-red-500 rounded-full">
                <TextInput
                    placeholder="Search Movies"
                    placeholderTextColor={"lightgrey"}
                    className="pb-1 pl-6 flex-1 font-semibold text-base text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => router.push("/")}
                    style={{
                        borderRadius: 9999,
                        padding: 12,
                        margin: 4,
                        backgroundColor: "red"
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
                                onPress={() => router.push("/movie/1")}
                            >
                                <View className="space-y-2 mb-4">
                                    <Image
                                        source={require("../../assets/images/photo1718636137.jpeg")}
                                        style={{
                                            borderRadius: 24,
                                            width: width * 0.4,
                                            height: height * 0.3
                                        }}
                                    />
                                    <Text className="text-base text-white ml-1">
                                        {movieName.length > 20
                                            ? movieName.slice(0, 17) + "..."
                                            : movieName}
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

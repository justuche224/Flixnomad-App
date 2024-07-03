import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const LoadingScreen = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{ height: height, width: width, flex: 1 }}
      className="absolute flex-row items-center justify-center bg-black"
    >
      <Progress.CircleSnail thickness={5} color="red" size={70} />
    </View>
  );
};

export default LoadingScreen;

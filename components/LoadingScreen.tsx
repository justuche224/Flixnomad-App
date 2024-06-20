import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const LoadingScreen = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{ height: height, width: width }}
      className="absolute flex-row items-center justify-center"
    >
      <Progress.CircleSnail thickness={7} color="red" size={100} />
    </View>
  );
};

export default LoadingScreen;

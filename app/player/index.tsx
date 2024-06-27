import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import LoadingScreen from "@/components/LoadingScreen";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const MoviePlayerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const { url, poster } = useLocalSearchParams();
  // console.log(url, poster);

  if (!url || !poster) {
    return <Text>No url or poster</Text>;
  }

  const videoUrl = Array.isArray(url) ? url[0] : (url as string);
  const videoPoster = Array.isArray(poster) ? poster[0] : (poster as string);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading && <LoadingScreen />}
      {error && <Text>{error}</Text>}
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        posterSource={{ uri: videoPoster }}
        shouldPlay
        onError={(error) => setError(error)}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setLoading(false);
          }
        }}
        onFullscreenUpdate={async ({ fullscreenUpdate }) => {
          if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            );
          } else if (
            fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
          ) {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: height,
    width: width,
  },
  video: {
    width: width,
    height: height * 0.5,
  },
});

export default MoviePlayerScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import LoadingScreen from "@/components/LoadingScreen";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const MoviePlayerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const { url, poster } = useLocalSearchParams();

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

  const handleRetry = () => {
    setError(undefined);
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingScreen />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {!error && (
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          posterSource={{ uri: videoPoster }}
          shouldPlay
          onError={(err) => setError(err)}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setLoading(false);
            }
          }}
          onFullscreenUpdate={async ({ fullscreenUpdate }) => {
            if (
              fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
            ) {
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
      )}
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
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  retryText: {
    color: "white",
  },
});

export default MoviePlayerScreen;

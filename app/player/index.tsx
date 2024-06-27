import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const MoviePlayerScreen = () => {
  const route = useRoute();
  //const { videoUrl } = route.params;
const videoUrl = ""
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: width,
    height: height * 0.5,
  },
});

export default MoviePlayerScreen;
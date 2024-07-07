// Header.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const ios = Platform.OS === "ios";

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        ios ? styles.iosSafeArea : styles.androidSafeArea,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Fontisto name="film" size={21} color="red" /> {title}
        </Text>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <FontAwesome5 color="white" name="search" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginBottom: -8,
  },
  iosSafeArea: {
    marginTop: null,
  },
  androidSafeArea: {
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    lineHeight: 42,
  },
});

export default Header;

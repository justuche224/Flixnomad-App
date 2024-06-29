import { Tabs } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
// import TabBar from "@/components/navigation/TabBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  //      tabBar={(props) => <TabBar {...props} />}

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: "black", borderTopColor: "black" },
        // tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="playcircleo" size={28} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="downloads"
        options={{
          title: "Downloads",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="download" size={28} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="series"
        options={{
          title: "Series",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="videocamera" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="genres"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="bars" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import  TabBar  from "@/components/navigation/TabBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="movies"
                options={{
                    title: "Movies",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="series"
                options={{
                    title: "Series",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="genres"
                options={{
                    title: "Genres",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "list" : "list-outline"}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}

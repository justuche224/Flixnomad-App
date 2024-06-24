import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export function Collapsible({
    children,
    title
}: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useColorScheme() ?? "light";

    return (
        <View>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen(value => !value)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isOpen ? "chevron-down" : "chevron-forward-outline"}
                    size={18}
                    color={
                        theme === "light" ? Colors.light.icon : Colors.dark.icon
                    }
                />
                <Text className="font-bold text-3xl" style={{ color: "white" }}>{title}</Text>
            </TouchableOpacity>
            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "black",
        color: "white"
    },
    content: {
        marginTop: 6,
        marginLeft: 24,
        backgroundColor: "black",
        color: "white"
    }
});

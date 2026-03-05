import useTheme from "@/src/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import { Image } from "react-native"

const TabsLayout = () => {
    const { colors } = useTheme()
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.navbar,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                paddingTop: 6,
                height: 70, // optional: control height instead
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600"
            },
            // headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerShadowVisible: false,
            animation: "shift",
            // headerShown: false
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerTitle: () => (
                        <Image
                            source={require("@/assets/images/logo.webp")}
                            style={{ width: 120, height: 40, resizeMode: "contain" }}
                        />
                    ),
                    headerTitleAlign: "center",
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" size={size} color={color} />
                    ),
                    headerShown: false,   // important
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
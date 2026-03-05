import { SearchBar, SearchInput } from "@/src/components/ui/SearchBar";
import useTheme from "@/src/context/ThemeContext";
import { Stack } from "expo-router";


export default function ExploreLayout() {
    const { colors } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                animation: "none"
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: () => <SearchBar />,

                }}
            />

            <Stack.Screen
                name="search"
                options={{
                    headerTitle: () => <SearchInput />,
                    headerTintColor: colors.textPrimary
                }}
            />
        </Stack>
    );
}
import { PokeListProvider } from "@/src/context/PokeListContext";
import useTheme, { ThemeProvider } from "@/src/context/ThemeContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as DefaultThemeProvider
} from "@react-navigation/native";
import { Stack } from "expo-router";



export default function RootLayout() {
  return (
    <ThemeProvider>
      <PokeListProvider>
        <AppStack />
      </PokeListProvider>
    </ThemeProvider>
  );
}

function AppStack() {
  const { isDarkMode, colors } = useTheme();

  const theme = isDarkMode ? DarkTheme : DefaultTheme;
  return (
    <DefaultThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",        // smoothest for theme/dark
          animationDuration: 200,
          contentStyle: { backgroundColor: colors.background },
        }}
      />

    </DefaultThemeProvider>
  );
}
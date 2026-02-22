import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme || "light"];

  return (
    <SafeAreaProvider>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </SafeAreaProvider>
  );
}
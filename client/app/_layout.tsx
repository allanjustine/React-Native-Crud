import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/context/auth-context";
import { BaseLayout } from "@/components/layout/base-layout";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <BaseLayout />
      </ThemeProvider>
    </AuthProvider>
  );
}

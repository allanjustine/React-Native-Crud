import { useAuth } from "@/context/auth-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const BaseLayout = () => {
  const { user } = useAuth();
  return (
    <>
      <Stack>
        <Stack.Protected guard={user}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: isDarkMode ? "#121212" : "#F0F4F8",
          }}
        >
          <ThemedView style={styles.hero}>
            <ThemedText
              type="title"
              style={{ color: isDarkMode ? "#fff" : "#222" }}
            >
              Welcome!
            </ThemedText>
            <HelloWave />
          </ThemedView>

          {/* Quick CRUD Actions */}
          <ThemedView style={styles.actionsContainer}>
            {[
              { label: "Create User", link: "/create-user", color: "#4F8EF7" },
              { label: "View Users", link: "/users", color: "#34D399" },
              {
                label: "Update User",
                link: "/users/edit-user",
                color: "#FBBF24",
              },
            ].map((action: any) => (
              <TouchableOpacity
                key={action.label}
                style={[styles.actionButton, { backgroundColor: action.color }]}
                onPress={() => router.push(action.link)}
              >
                <ThemedText type="subtitle" style={styles.actionText}>
                  {action.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "120%",
    gap: 12,
  },
  hero: {
    marginVertical: 24,
    position: "relative",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  heroImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 120,
    width: 200,
    opacity: 0.2,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    minWidth: "45%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  actionText: {
    color: "#fff",
  },
});

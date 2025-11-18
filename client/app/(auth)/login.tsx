import { ThemedText } from "@/components/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useAuth } from "@/context/auth-context";
import useHandle from "@/hooks/use-handle";
import FormInput from "@/components/ui/form-input";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { loading, error, errors, execute } = useHandle(login);

  async function handleLogin() {
    const response = await execute({ email, password });

    if (response.status === 200) {
      ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      router.push("/");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Welcome Back</ThemedText>
        <ThemedText style={styles.subtitle}>Login to your account</ThemedText>

        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          inputMode="email"
          error={errors?.email?.[0]}
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          error={errors?.password?.[0]}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText>Don`t have an account? </ThemedText>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <ThemedText style={styles.link}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginTop: -150 },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
    textAlign: "center",
  },
  errorText: { color: "red", marginBottom: 10, textAlign: "center" },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#7aa7e9" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  link: { color: "#007bff", fontWeight: "bold" },
});

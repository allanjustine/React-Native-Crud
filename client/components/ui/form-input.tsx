import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/themed-text";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  inputMode?: "text" | "email" | "numeric";
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  inputMode = "text",
}: FormInputProps) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <ThemedText>{label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? "white" : "black",
            color: isDarkMode ? "white" : "black",
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? "white" : "gray"}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 8,
    borderRadius: 12,
    fontSize: 16,
  },
  error: { color: "red", fontSize: 12, marginTop: 5 },
});

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { USER_FORM_INPUT } from "@/constants/form-input";
import { UserFormInputType } from "@/types/form-input-type";
import { storeUser } from "@/services/user-service";
import useHandle from "@/hooks/use-handle";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";

export default function CreateUser() {
  const [formInput, setFormInput] =
    useState<UserFormInputType>(USER_FORM_INPUT);
  const { loading, errors, execute } = useHandle(storeUser);
  const isDarkMode = useColorScheme() === "dark";

  const handleOnChange = (title: string) => (value: string) => {
    setFormInput({
      ...formInput,
      [title]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await execute(formInput);

    if (response?.status === 201) {
      setFormInput(USER_FORM_INPUT);
      ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      router.push("/users");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.formElement}>
        <ThemedText style={styles.title}>User Details</ThemedText>
        <ThemedView style={styles.formInput}>
          <ThemedText>Name</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? "white" : "black",
                borderColor: isDarkMode ? "white" : "black",
              },
            ]}
            inputMode="text"
            value={formInput.name}
            placeholder="Enter name"
            onChangeText={handleOnChange("name")}
            placeholderTextColor={isDarkMode ? "white" : "black"}
          />
          {errors?.name && <Text style={styles.errors}>{errors?.name[0]}</Text>}
        </ThemedView>
        <ThemedView style={styles.formInput}>
          <ThemedText>Email</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? "white" : "black",
                borderColor: isDarkMode ? "white" : "black",
              },
            ]}
            inputMode="email"
            value={formInput.email}
            placeholder="Enter email"
            onChangeText={handleOnChange("email")}
            placeholderTextColor={isDarkMode ? "white" : "black"}
          />
          {errors?.email && (
            <Text style={styles.errors}>{errors?.email[0]}</Text>
          )}
        </ThemedView>
        <ThemedView style={styles.formInput}>
          <ThemedText>Password</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? "white" : "black",
                borderColor: isDarkMode ? "white" : "black",
              },
            ]}
            inputMode="text"
            secureTextEntry
            value={formInput.password}
            placeholder="Enter password"
            onChangeText={handleOnChange("password")}
            placeholderTextColor={isDarkMode ? "white" : "black"}
          />
          {errors?.password && (
            <Text style={styles.errors}>{errors?.password[0]}</Text>
          )}
        </ThemedView>
        <ThemedView style={styles.formInput}>
          <ThemedText>Password Confirmation</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? "white" : "black",
                borderColor: isDarkMode ? "white" : "black",
              },
            ]}
            inputMode="text"
            secureTextEntry
            value={formInput.password_confirmation}
            placeholder="Enter password confirmation"
            onChangeText={handleOnChange("password_confirmation")}
            placeholderTextColor={isDarkMode ? "white" : "black"}
          />
          {errors?.password_confirmation && (
            <Text style={styles.errors}>
              {errors?.password_confirmation[0]}
            </Text>
          )}
        </ThemedView>
        <ThemedView style={styles.formInput}>
          <Button
            title={`${loading ? "Submitting..." : "Submit"}`}
            disabled={loading}
            onPress={handleSubmit}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formElement: {
    flexDirection: "column",
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    paddingVertical: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  formInput: {
    margin: 5,
  },
  errors: {
    fontSize: 12,
    color: "red",
  },
});

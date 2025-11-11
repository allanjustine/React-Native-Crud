import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { USER_FORM_INPUT } from "@/constants/form-input";
import { UserFormInputType } from "@/types/form-input-type";
import { updateUser } from "@/services/user-service";
import useHandle from "@/hooks/use-handle";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";

interface Users {
  id: number;
  name: string;
  email: string;
}

export default function EditUser({
  user,
  isOpen,
  onClose,
  reload,
}: {
  user: Users | null;
  isOpen: boolean;
  onClose: () => void;
  reload: () => void;
}) {
  const [formInput, setFormInput] =
    useState<UserFormInputType>(USER_FORM_INPUT);
  const { loading, errors, execute } = useHandle(updateUser);
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    if (!user) return;
    setFormInput(user);
  }, [user]);

  const handleOnChange = (title: string) => (value: string) => {
    setFormInput({
      ...formInput,
      [title]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await execute(Number(user?.id), formInput);

    if (response?.status === 200) {
      ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      onClose();
      reload();
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Modal visible={isOpen} animationType="slide">
      <ThemedView style={styles.container}>
        <ThemedView style={styles.formElement}>
          <ThemedText style={styles.title}>Edit User</ThemedText>
          <View style={styles.formInput}>
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
            {errors?.name && (
              <Text style={styles.errors}>{errors?.name[0]}</Text>
            )}
          </View>
          <View style={styles.formInput}>
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
          </View>
          <View style={styles.formInput}>
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
          </View>
          <View style={styles.formInput}>
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
          </View>
          <View style={styles.formInput}>
            <Button
              title={`${loading ? "Submitting..." : "Submit"}`}
              disabled={loading}
              onPress={handleSubmit}
            />
            <Button
              onPress={onClose ?? handleBack}
              title="Close"
              color="gray"
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
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
    flexDirection: "column",
    gap: 3,
  },
  errors: {
    fontSize: 12,
    color: "red",
  },
});

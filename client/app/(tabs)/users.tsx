import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { deleteUser } from "@/services/user-service";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditUser from "../(modals)/users/edit-user";
import useFetch from "@/hooks/use-fetch";
import ListLoader from "@/components/list-loader";
import useHandle from "@/hooks/use-handle";
import { ThemedText } from "@/components/themed-text";

interface Users {
  id: number;
  name: string;
  email: string;
}

export default function TabTwoScreen() {
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: users,
    loading,
    reload,
    handleSearchTerm,
    searchTerm,
  } = useFetch(`/users`);
  const { execute } = useHandle(deleteUser);

  const handleAddUser = () => {
    router.push("/create-user");
  };

  const handleConfirmDelete = (userId: number) => () => {
    Alert.alert("Delete user", "Are you sure you want to delete this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        style: "destructive",
        onPress: () => handleDelete(userId),
      },
    ]);
  };

  const handleOpenModal = (user: Users | null) => () => {
    setIsOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId: number) => {
    const response = await execute(userId);

    if (response?.status === 200) {
      ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      reload();
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.flex}>
          <ThemedText style={styles.titleText}>
            {users?.length > 0 ? `Users ${users?.length}` : "No users"}
          </ThemedText>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#fff"
            returnKeyType="search"
            onChangeText={handleSearchTerm}
          />
        </ThemedView>
        {loading ? (
          <ListLoader listNumber={6} />
        ) : (
          <FlatList
            style={styles.flatList}
            data={users}
            renderItem={({ item, index }) => (
              <ThemedView key={index} style={styles.itemContainer}>
                <ThemedView style={styles.detailsContainer}>
                  <ThemedText style={styles.item}>{item.name}</ThemedText>
                  <ThemedText style={styles.item2}>{item.email}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.icons}>
                  <TouchableOpacity onPress={handleConfirmDelete(item.id)}>
                    <IconSymbol name="trash.fill" size={24} color="#ef4444" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleOpenModal(item)}>
                    <IconSymbol
                      name="pencil.circle.fill"
                      size={24}
                      color="#3b82f6"
                    />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={reload} />
            }
            ListEmptyComponent={
              <ThemedText style={styles.emptyList}>
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "No users found"}
              </ThemedText>
            }
          />
        )}
        <EditUser
          user={selectedUser}
          isOpen={isOpen}
          onClose={handleCloseModal}
          reload={reload}
        />
      </ThemedView>
      {!loading && (
        <TouchableOpacity style={styles.fab} onPress={handleAddUser}>
          <ThemedText style={styles.fabText}>+</ThemedText>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
  },
  flatList: {
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  item2: {
    padding: 10,
    fontSize: 13,
    height: 44,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  icons: {
    flexDirection: "column",
    gap: 10,
  },
  detailsContainer: {
    maxWidth: "80%",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 34,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    color: "#fff",
    borderColor: "#fff",
    width: "50%",
  },
  emptyList: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
});

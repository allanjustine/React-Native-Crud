import { FlatList, StyleSheet, View } from "react-native";

export default function ListLoader({
  listNumber = 5,
}: {
  listNumber?: number;
}) {
  return (
    <FlatList
      data={Array.from({ length: listNumber })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <View style={[styles.itemContainer, { opacity: 0.5 }]}>
          <View style={styles.detailsContainer}>
            <View style={styles.skeletonLine} />
            <View
              style={[styles.skeletonLine, { width: "60%", marginTop: 6 }]}
            />
          </View>
          <View style={styles.icons}>
            <View style={styles.skeletonIcon} />
            <View style={styles.skeletonIcon} />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    width: "80%",
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  icons: {
    flexDirection: "column",
    gap: 10,
  },
});

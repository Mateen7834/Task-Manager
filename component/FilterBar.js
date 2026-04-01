import { View, Text, Pressable, StyleSheet } from "react-native";

export default function FilterBar({ filter, setFilter }) {
  return (
    <View style={styles.row}>
      {["all", "completed", "pending"].map(type => (
        <Pressable
          key={type}
          onPress={() => setFilter(type)}
          style={[styles.button, filter === type && styles.active]}
        >
          <Text style={styles.text}>{type}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  active: {
    backgroundColor: "#00C6FF",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

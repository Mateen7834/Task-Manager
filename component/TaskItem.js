import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onToggle(item.id)}>
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </Pressable>

      <Pressable onPress={() => onDelete(item.id)}>
        <Text style={styles.delete}>❌</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "red",
    fontSize: 18,
  },
});

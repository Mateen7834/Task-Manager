import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskItem from "../component/TaskItem";
import FilterBar from "../component/FilterBar";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔹 LOAD TASKS ON APP START
  useEffect(() => {
    loadTasks();
  }, []);

  // 🔹 SAVE TASKS WHENEVER THEY CHANGE
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  function addTask() {
    if (!task.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(item => item.id !== id));
  }

  // 🔹 SAVE TO ASYNC STORAGE
  async function saveTasks() {
    try {
      await AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    } catch (error) {
      console.log("Error saving tasks");
    }
  }

  // 🔹 LOAD FROM ASYNC STORAGE
  async function loadTasks() {
    try {
      const storedTasks = await AsyncStorage.getItem("TASKS");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log("Error loading tasks");
    }
  }

  const filteredTasks = tasks.filter(item => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        placeholder="Enter task"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />

      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.addText}>Add Task</Text>
      </Pressable>

      <FilterBar filter={filter} setFilter={setFilter} />

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2027",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#00C6FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addText: {
    color: "white",
    fontWeight: "bold",
  },
});

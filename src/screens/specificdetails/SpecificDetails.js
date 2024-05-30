// src/screens/details/TaskDetails.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../themes/ThemeContext";

const SpecificDetails = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { taskId } = route.params;
  const task = useSelector((state) =>
    state.manager.tasks.find((task) => task.id === taskId)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <Text style={{ ...styles.header, color: theme.text }}>{task.title}</Text>
      <Text style={{ color: theme.text }}>Assigned to: {task.assignedTo}</Text>
      <Text style={{ color: theme.text }}>Status: {task.status}</Text>
      <Text style={{ color: theme.text }}>Description: {task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 45,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SpecificDetails;

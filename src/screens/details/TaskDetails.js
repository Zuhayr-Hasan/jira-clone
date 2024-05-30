import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const TaskCard = ({ taskTitle, taskStatus }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.taskTitle}>{taskTitle}</Text>
      <Text style={styles.taskStatus}>{taskStatus}</Text>
    </View>
  );
};

const TaskDetails = () => {
  const tasks = useSelector((state) => state.manager.tasks);
  const employees = useSelector((state) => state.manager.employees);

  return (
    <View style={styles.container}>
      <Text>Employee: {employees[0].name}</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            taskTitle={task.title}
            taskStatus={task.status}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6F8FAF",
  },
});

export default TaskDetails;

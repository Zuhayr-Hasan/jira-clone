import { sendPushNotification } from "../../utils/Notification";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllTasks,
  loadEmployees,
  createTask,
} from "../../slices/managerSlice";

const ManagerComponent = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.manager.tasks);
  const employees = useSelector((state) => state.manager.employees);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    dispatch(loadAllTasks());
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleCreateTask = () => {
    if (taskTitle && assignedTo) {
      dispatch(createTask({ title: taskTitle, assignedTo, status: "Pending" }));
      setTaskTitle("");
      setAssignedTo("");

      // Notification
      sendPushNotification("A new task has been created.");
      sendPushNotification("You have a new task assigned."); // Send notification to assigned employee
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Picker
        selectedValue={assignedTo}
        style={styles.picker}
        onValueChange={(value) => setAssignedTo(value)}
      >
        <Picker.Item label="Select Employee" value="" />
        {employees.map((employee) => (
          <Picker.Item
            key={employee.id}
            label={employee.name}
            value={employee.id}
          />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <Text style={styles.header}>All Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Assigned to: {item.assignedTo}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ManagerComponent;

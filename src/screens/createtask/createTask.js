// src/screens/createtask/CreateTask.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../slices/managerSlice";
import { Picker } from "@react-native-picker/picker";
import { sendPushNotification } from "../../utils/Notification";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const CreateTask = () => {
  const employees = useSelector((state) => state.manager.employees);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigation = useNavigation();

  const handleCreateTask = () => {
    if (taskTitle && assignedTo) {
      const selectedEmployee = employees.find(
        (employee) => employee.id === assignedTo
      );
      if (!selectedEmployee) {
        console.log("Please select an employee.");
        return;
      }

      const task = {
        title: taskTitle,
        assignedTo: selectedEmployee.name,
        description: taskDescription,
        deadline: deadline,
        status: "Pending",
      };

      dispatch(createTask(task));

      // Notification
      sendPushNotification("A new task has been created.");
      sendPushNotification("You have a new task assigned.");

      // Reset form fields after task creation
      setTaskTitle("");
      setAssignedTo("");
      setTaskDescription("");
      setDeadline("");
      navigation.navigate("Manager");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline"
        value={deadline}
        onChangeText={setDeadline}
      />
      <Picker
        selectedValue={assignedTo}
        style={styles.picker}
        onValueChange={(itemValue) => setAssignedTo(itemValue)}
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
        <Text style={styles.buttonText}>Assign</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderColor: "#0f2587",
    borderRadius: 5,
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
    backgroundColor: "#0146b3",
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
});

export default CreateTask;

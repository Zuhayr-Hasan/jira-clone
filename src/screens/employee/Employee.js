import { sendPushNotification } from "../../utils/Notification"; // Import the notification function
import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, changeTaskStatus } from "../../slices/employeeSlice";
import { Picker } from "@react-native-picker/picker";

const EmployeeComponent = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.employee.tasks);
  const taskStatus = useSelector((state) => state.employee.status);
  const userId = useSelector((state) => state.auth.userId); // Assuming you have userId in auth slice

  console.log("userid11", userId);
  console.log("taskstatus11", taskStatus);
  console.log("task11", tasks);

  useEffect(() => {
    dispatch(loadTasks(userId));
  }, [dispatch, userId]);

  const handleStatusChange = (taskId, status) => {
    dispatch(changeTaskStatus({ taskId, status }));

    const task = tasks.find((task) => task.id === taskId);
    if (task && task.assignedTo === userId) {
      sendPushNotification("You have a new task assigned.");
    }
  };

  return (
    <View style={styles.container}>
      {taskStatus === "loading" && <Text>Loading...</Text>}
      {taskStatus === "failed" && <Text>Error loading tasks</Text>}
      {taskStatus === "succeeded" && (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Picker
                selectedValue={item.status}
                style={styles.picker}
                onValueChange={(value) => handleStatusChange(item.id, value)}
              >
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Inprogress" value="Inprogress" />
                <Picker.Item label="Pending" value="Pending" />
              </Picker>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  picker: {
    height: 50,
    width: 150,
  },
});

export default EmployeeComponent;

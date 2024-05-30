// src/screens/manager/ManagerScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllTasks,
  loadEmployees,
  deleteTask,
} from "../../slices/managerSlice"; // Import deleteTask action
import { useTheme } from "../../themes/ThemeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../slices/authSlice";

const ManagerComponent = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.manager.tasks);
  const employees = useSelector((state) => state.manager.employees);
  const navigation = useNavigation();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadAllTasks());
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleNavigateToCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const handleTaskPress = (taskId) => {
    navigation.navigate("TaskDetails", { taskId });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color="black"
          onPress={handleLogout}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToCreateTask}
      >
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <Text style={{ ...styles.header, color: theme.text }}>All Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTaskPress(item.id)}
            style={{ ...styles.taskCard, backgroundColor: theme.inputColor }}
          >
            <View style={styles.taskHeader}>
              <Text style={{ ...styles.taskTitle, color: theme.text }}>
                Task: {item.title}
              </Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <MaterialIcons name="delete" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: theme.text }}>
              Assigned to: {item.assignedTo}
            </Text>
            <Text style={{ color: theme.text, marginTop: 5 }}>
              Status: <Text style={styles.status}>{item.status}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
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
  taskCard: {
    backgroundColor: "#f2f2f2",
    padding: 25,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    color: "#6F8FAF",
    fontWeight: "bold",
  },
});

export default ManagerComponent;

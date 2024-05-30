// src/navigators/ManagerStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManagerComponent from "../screens/manager/ManagerScreen";
import CreateTask from "../screens/createtask/createTask";
import TaskDetails from "../screens/specificdetails/SpecificDetails";

const Stack = createStackNavigator();

const ManagerStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Manager">
      <Stack.Screen
        name="Manager"
        component={ManagerComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ title: "Create Task" }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{ title: "Task Details" }}
      />
    </Stack.Navigator>
  );
};

export default ManagerStackNavigator;

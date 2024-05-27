import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectFormScreen from "../screens/client/ProjectForm";
import HomeTabs from "./HomeTabs"; // Import HomeTabs component

// Import additional screens as needed
// import ProjectListScreen from "../screens/Project/ProjectListScreen";
// import ProjectDetailsScreen from "../screens/Project/ProjectDetailsScreen";

const Stack = createStackNavigator();

const ProjectNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="ProjectForm" component={ProjectFormScreen} /> */}
  </Stack.Navigator>
);

export default ProjectNavigator;

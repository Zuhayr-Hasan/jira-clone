import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmployeeComponent from "../screens/employee/Employee";
import Settings from "../components/settings/Settings";
import EmployeeDetails from "../screens/details/TaskDetails";
import ManagerStackNavigator from "./ManagerStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const userRole = useSelector((state) => state.auth.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Manager") {
            iconName = "account-circle";
          } else if (route.name === "Employee") {
            iconName = "account";
          } else if (route.name === "Details") {
            iconName = "information";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#0146b3",
      }}
    >
      {userRole === "employee" && (
        <>
          <Tab.Screen name="Employee" component={EmployeeComponent} />
          <Tab.Screen name="Settings" component={Settings} />
        </>
      )}
      {userRole === "manager" && (
        <>
          <Tab.Screen name="Manager" component={ManagerStackNavigator} />
          <Tab.Screen name="Details" component={EmployeeDetails} />
          <Tab.Screen name="Settings" component={Settings} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;

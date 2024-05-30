// src/navigators/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmployeeComponent from "../screens/employee/Employee";
import Settings from "../components/settings/Settings";
import EmployeeDetails from "../screens/details/TaskDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ManagerStackNavigator from "./ManagerStackNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "Manager") {
                  iconName = "account-circle";
                } else if (route.name === "Details") {
                  iconName = "information";
                } else if (route.name === "Settings") {
                  iconName = "cog";
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
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
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;

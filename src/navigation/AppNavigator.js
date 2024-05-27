import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmployeeComponent from "../screens/employee/Employee";
import ManagerComponent from "../screens/manager/ManagerScreen";
import { fetchUserData } from "../api/firestoreOperations";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator>
            {userRole === "employee" && (
              <Tab.Screen name="Employee" component={EmployeeComponent} />
            )}
            {userRole === "manager" && (
              <Tab.Screen name="Manager" component={ManagerComponent} />
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;

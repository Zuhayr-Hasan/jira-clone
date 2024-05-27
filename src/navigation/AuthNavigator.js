import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/Login";
import SignupScreen from "../screens/auth/Signup";
import LoginComponent from "../components/auth/LoginForm";
import SignupComponent from "../components/auth/SignupForm";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginComponent} />
    <Stack.Screen name="Signup" component={SignupComponent} />
  </Stack.Navigator>
);

export default AuthNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/auth/LoginForm";
import SignupScreen from "../components/auth/SignupForm";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

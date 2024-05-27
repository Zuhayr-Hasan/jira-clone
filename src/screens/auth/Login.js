import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { StyleSheet, View } from "react-native";

function Login() {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;

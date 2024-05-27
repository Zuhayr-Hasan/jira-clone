import React from "react";
import SignupScreen from "../../components/auth/SignupForm";
import { View, StyleSheet } from "react-native";

function Signup() {
  return (
    <View style={styles.container}>
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Signup;

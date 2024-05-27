import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { fetchUserData } from "../../api/firestoreOperations";
import { useTheme } from "../../themes/ThemeContext"; // Import useTheme from ThemeContext

const LoginForm = ({ navigation, authenticate }) => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userLogged = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userLogged.user;

      if (user) {
        const userFireStoreData = await fetchUserData(user?.uid);
        dispatch(
          login({
            userId: user.uid,
            email: user.email,
            role: userFireStoreData.role,
          })
        );
      }

      navigation.navigate("Signup");
    } catch (errorDescription) {
      console.log("Unable to Login", errorDescription);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Theme</Text>
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: theme.text }}>JIRA</Text>
      <Text style={{ ...styles.subtitle, color: theme.text }}>
        Please enter your credentials
      </Text>
      <View style={styles.inputContainer}>
        <Text style={{ ...styles.label, color: theme.text }}>Email</Text>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.inputColor,
            borderColor: theme.inputColor,
          }}
          placeholder="someone@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ ...styles.label, color: theme.text }}>Password</Text>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.inputColor,
            borderColor: theme.inputColor,
          }}
          placeholder="Someone@123"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>
          Don't have an account? Sign up now!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    paddingTop: "30%"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#eee",
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 12,
    paddingHorizontal: 135,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "purple",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Toggle Button Styles
  toggleButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  toggleButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginForm;

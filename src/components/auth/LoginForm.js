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

const LoginForm = ({ navigation, authenticate }) => {
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
        console.log({ userFireStoreData });

        dispatch(
          login({
            userId: user.uid,
            email: user.email,
            role: userFireStoreData.role,
          })
        );
      }

      // console.log("LOGIN_SCREEN_EMAIL_USER---", user.email);
      navigation.navigate("Signup");
    } catch (errorDescription) {
      console.log("Unable to Login", errorDescription);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JIRA</Text>
      <Text style={styles.subtitle}>Please enter your credentials</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
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
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
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
    backgroundColor: "#fff",
    paddingTop: "25%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
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
});

export default LoginForm;

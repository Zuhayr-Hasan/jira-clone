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
import { useTheme } from "../../themes/ThemeContext";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

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

      console.log(user.name);

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
        {/* <Entypo name="light-down" size={24} color="black" /> */}
      </TouchableOpacity>
      <MaterialCommunityIcons name="jira" size={45} color="#0146b3" />
      <Text style={{ ...styles.title, color: theme.text }}>JIRA</Text>
      <Text style={{ ...styles.subtitle, color: theme.text }}>
        Please enter your credentials
      </Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={25}
          color="gray"
          style={styles.icon}
        />
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
        <Entypo name="lock" size={25} color="gray" style={styles.icon} />
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
    paddingTop: "25%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    paddingTop: "15%",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 40, // Adjust padding to accommodate icon inside
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#eee",
    paddingLeft: 50,
  },
  icon: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 100,
  },
  button: {
    backgroundColor: "#0146b3",
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
    color: "#0146b3",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Toggle Button Styles
  toggleButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 270,
  },
  toggleButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginForm;

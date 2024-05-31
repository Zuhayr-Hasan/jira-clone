// Import necessary modules
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { ThemeProvider } from "./src/themes/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Device } from "expo-device";

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  let token = null;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  
  // console.log("Is device 555:", Constants.isDevice);
  // console.log("Device", Device.isDevice);
  // console.log(theme);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <AppNavigator />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

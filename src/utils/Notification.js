import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // Import Constants from expo-constants package

export const sendPushNotification = async (message) => {
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: "projectadmins-a3ba3", // Use Constants.expoConfig to access the Firebase project ID
  });
  const { data } = await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Notification",
      body: message,
      data: { data: "goes here" },
    },
    to: token.data,
    sound: "default",
    channelId: "default",
  });

  console.log("Push notification token:", token);
};

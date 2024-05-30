import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useTheme } from "../../themes/ThemeContext";
import { Entypo } from "@expo/vector-icons";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  const handleToggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
    toggleTheme();
  };

  const renderSettingItem = (label) => (
    <View style={styles.settingItem}>
      <Text style={[styles.settingText, { color: theme.text }]}>{label}</Text>
      <Entypo name="chevron-right" size={24} color={theme.text} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Entypo name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.text }]}>Settings</Text>
        <TouchableOpacity>
          <Entypo name="magnifying-glass" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <View style={styles.settingsList}>
        {renderSettingItem("Language")}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: theme.text }]}>
            Dark mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={handleToggleSwitch}
            value={isDarkMode}
          />
        </View>
        {renderSettingItem("Notifications")}
        {renderSettingItem("Account")}
        {renderSettingItem("Help")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsList: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 16,
  },
});

export default Settings;

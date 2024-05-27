import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import HomeTabs from "../../navigation/HomeTabs";

const ProjectForm = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <HomeTabs /> */}
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.profilePic}
        />
        <Text style={styles.userName}>Hello Admin</Text>
      </View>

      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <View style={styles.quickAccessItems}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.quickAccessIcon}
            />
            <Text style={styles.quickAccessText}>Supernova</Text>
            <Text style={styles.quickAccessSubText}>Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.quickAccessIcon}
            />
            <Text style={styles.quickAccessText}>IT Ops</Text>
            <Text style={styles.quickAccessSubText}>Board</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.quickAccessIcon}
            />
            <Text style={styles.quickAccessText}>Team AGO</Text>
            <Text style={styles.quickAccessSubText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.quickAccessIcon}
            />
            <Text style={styles.quickAccessText}>Mobile tasks</Text>
            <Text style={styles.quickAccessSubText}>Flow</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentItemsContainer}>
        <Text style={styles.sectionTitle}>Recent items</Text>
        <View style={styles.recentItem}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.recentItemIcon}
          />
          <View style={styles.recentItemTextContainer}>
            <Text style={styles.recentItemTitle}>Performance Engineering</Text>
            <Text style={styles.recentItemSubtitle}>Eventboard • Viewed</Text>
          </View>
        </View>
        <View style={styles.recentItem}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.recentItemIcon}
          />
          <View style={styles.recentItemTextContainer}>
            <Text style={styles.recentItemTitle}>Travel Service Desk</Text>
            <Text style={styles.recentItemSubtitle}>Project • Viewed</Text>
          </View>
        </View>
        <View style={styles.recentItem}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.recentItemIcon}
          />
          <View style={styles.recentItemTextContainer}>
            <Text style={styles.recentItemTitle}>Marketing Creatives</Text>
            <Text style={styles.recentItemSubtitle}>Folder • Edited</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  quickAccessContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  quickAccessItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAccessItem: {
    alignItems: "center",
    width: 80,
  },
  quickAccessIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 5,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  quickAccessSubText: {
    fontSize: 12,
    color: "#777",
  },
  recentItemsContainer: {
    marginBottom: 20,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  recentItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  recentItemTextContainer: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  recentItemSubtitle: {
    fontSize: 14,
    color: "#777",
  },
});

export default ProjectForm;

import React from "react";
import ProjectForm from "../../components/project/ProjectForm";
import { View, StyleSheet } from "react-native";

function ProjectFormScreen() {
  return (
    <View style={styles.container}>
      <ProjectForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectFormScreen;

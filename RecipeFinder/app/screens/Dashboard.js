// Dashboard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Dashboard() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Dashboard!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;

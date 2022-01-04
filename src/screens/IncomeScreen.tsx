import React from "react";
import { StyleSheet, View } from "react-native";
import IncomeList from "../components/IncomeList";

export default function IncomeScreen() {
  return (
    <View style={styles.container}>
      <IncomeList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

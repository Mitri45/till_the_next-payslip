import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesList from "../components/ExpensesList";

export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <ExpensesList />
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

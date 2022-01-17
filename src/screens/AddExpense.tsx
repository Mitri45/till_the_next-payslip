import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesInput from "../components/Expenses/ExpensesInput";

export default function AddExpense() {
  return (
    <View style={styles.container}>
      <ExpensesInput />
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

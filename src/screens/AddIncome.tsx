import React from "react";
import { StyleSheet, View } from "react-native";
import IncomeInput from "../components/Income/IncomeInput";

export default function AddIncome() {
  return (
    <View style={styles.container}>
      <IncomeInput />
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

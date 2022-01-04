import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { getMoneyToSpendQuery } from "../recoil/selectors";

const MoneyToSpend = () => {
  const moneyToSpend = useRecoilValue(getMoneyToSpendQuery);

  return (
    <View style={styles.container}>
      <Text> amountToSpend {moneyToSpend} </Text>
    </View>
  );
};

export default MoneyToSpend;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
});

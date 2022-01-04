import React from "react";
import ExpenseCard from "./ExpenseCard";
import { FlatList, View } from "react-native";
import { Expense } from "../utils/ExpenseClass";
import { useRecoilValue } from "recoil";
import { expensesState } from "../recoil/atoms";

export default function ExpensesList() {
  const expenses = useRecoilValue(expensesState);
  //   React.useEffect(() => {
  //     if (!refreshKey) return;
  //     console.log("In the refresh key effect");
  //     if (refreshKey === "incomeRefreshKey") return;
  //     const refreshCardsList = async () => {
  //       const newExpense = await getItem(refreshKey);
  //       if (newExpense) {
  //         setExpenses((expenses) => [...expenses, JSON.parse(newExpense)]);
  //       }
  //     };
  //     refreshCardsList();
  //   }, [refreshKey]);

  const renderItem = ({ item }: { item: Expense }) => (
    <ExpenseCard
      name={item.name}
      amount={item.amount}
      repeatInterval={item.repeatInterval}
      key={item.name}
    />
  );
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

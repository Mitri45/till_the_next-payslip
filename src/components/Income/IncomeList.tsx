import React from "react";
import IncomeCard from "./IncomeCard";
import { getAllKeys, getItem } from "../../utils/AsyncStorageUtils";
import { FlatList, View } from "react-native";
import { Income } from "../../utils/IncomeClass";
import { useRecoilValue } from "recoil";
import { incomeState } from "../../recoil/atoms";

export default function IncomeList() {
  const income = useRecoilValue(incomeState);

  const renderItem = ({ item }: { item: Income }) => (
    <IncomeCard
      name={item.name}
      amount={item.amount}
      repeatDay={item.repeatDayOfTheWeek}
      key={item.name}
    />
  );
  return (
    <View>
      <FlatList
        data={income}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

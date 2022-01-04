import React from "react";
import moment from "moment";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Pressable,
} from "react-native";
import { setItem, clearAll, getAllKeys } from "../utils/AsyncStorageUtils";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Expense, repeatInterval } from "../utils/ExpenseClass";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSetRecoilState } from "recoil";
import { expensesState } from "../recoil/atoms";

type NavProps = NativeStackNavigationProp<HomeStackParamList, "AddExpense">;

const ExpensesInput = () => {
  const { navigate } = useNavigation<NavProps>();
  const setExpenses = useSetRecoilState(expensesState);
  const [amount, setAmount] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [isRepeatable, setIsRepeatable] = React.useState(true);
  const [interval, setInterval] = React.useState(repeatInterval[0]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [name, setName] = React.useState("");

  const onPressSave = async () => {
    if (!amount) return;
    const storageKeysArr = await getAllKeys();
    if (storageKeysArr) {
      const storageLength = storageKeysArr.length;
      const expense = new Expense(
        name,
        parseInt(amount),
        startDate,
        endDate,
        isRepeatable,
        interval,
        storageLength
      );
      const key = "expense_" + storageLength;
      try {
        await setItem(key, JSON.stringify(expense));
        setExpenses((oldExpenses) => {
          console.log("oldExpenses", oldExpenses);
          const newExpenses = [...oldExpenses, expense];
          console.log("newExpenses", newExpenses);
          return newExpenses;
        });
        navigate("Home");
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const onDateChange = (event: any, newDate?: Date | undefined) => {
    if (event && newDate) {
      setShowDatePicker(false);
      setStartDate(newDate);
    }
  };

  return (
    <SafeAreaView>
      <Text> Expenses Input </Text>
      <View style={styles.paramsContainer}>
        <View style={styles.inputContainer}>
          <Text> Name of the expense</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text> Amount NZD</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Expense cost"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text> Is repeatable? </Text>
          <Checkbox
            value={isRepeatable}
            onValueChange={() => setIsRepeatable(!isRepeatable)}
            color={isRepeatable ? "#4630EB" : undefined}
          />
        </View>
        {isRepeatable && (
          <View>
            <View style={styles.inputContainer}>
              <Text> Start date </Text>
              <Pressable onTouchEnd={() => setShowDatePicker(true)}>
                <Text>{moment(startDate).format("DD.MM.YYYY")}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text> End date </Text>
              <Pressable onTouchEnd={() => setShowDatePicker(true)}>
                <Text>{moment(endDate).format("DD.MM.YYYY")}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text> Repeat Interval </Text>
              <Picker
                selectedValue={interval}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {
                  setInterval(itemValue);
                }}
              >
                {repeatInterval.map((item) => (
                  <Picker.Item label={item} value={item} key={item} />
                ))}
              </Picker>
            </View>
          </View>
        )}
        <Button
          onPress={onPressSave}
          title="Save expense"
          color="#841584"
          accessibilityLabel="Save expense"
        />
        <Button
          onPress={getAllKeys}
          title="SHOW KEYS"
          color="#841584"
          accessibilityLabel="Save expense"
        />
        <Button
          onPress={clearAll}
          title="DANGER"
          color="#841584"
          accessibilityLabel="Save expense"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paramsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default ExpensesInput;

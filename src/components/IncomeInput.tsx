import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/AsyncStorageUtils";
import { Picker } from "@react-native-picker/picker";
import { Income, weekDays } from "../utils/IncomeClass";
import { HomeStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavProps = NativeStackNavigationProp<HomeStackParamList, "AddIncome">;

const IncomeInput = () => {
  const { navigate } = useNavigation<NavProps>();
  const [amount, setAmount] = React.useState("");
  const [repeatDay, setRepeatDay] = React.useState(weekDays[0]);
  const [name, setName] = React.useState("Salary");
  const onPressSave = async () => {
    if (!amount) return;
    const id = Math.floor(Math.random() * 1000000);
    const expense = new Income(name, parseInt(amount), repeatDay, id);
    await setItem("income", JSON.stringify(expense));
    navigate("Home");
  };
  return (
    <SafeAreaView>
      <Text> Income Input </Text>
      <View style={styles.paramsContainer}>
        <View style={styles.inputContainer}>
          <Text> Name of the income</Text>
          <TextInput style={styles.input} onChangeText={setName} value={name} />
        </View>
        <View style={styles.inputContainer}>
          <Text> Amount NZD</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Income in NZD"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text> Weekly payday </Text>
          <Picker
            selectedValue={repeatDay}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              setRepeatDay(itemValue);
            }}
          >
            {weekDays.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <Button
          onPress={onPressSave}
          title="Save income"
          color="#841584"
          accessibilityLabel="Save income"
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

export default IncomeInput;

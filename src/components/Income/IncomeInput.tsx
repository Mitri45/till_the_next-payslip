import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../../utils/AsyncStorageUtils";
import { Picker } from "@react-native-picker/picker";
import { Income, repeatInterval, weekDaysArray } from "../../utils/IncomeClass";
import { HomeStackParamList } from "../../screens/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

type NavProps = NativeStackNavigationProp<HomeStackParamList, "AddIncome">;

const IncomeInput = () => {
  const { navigate } = useNavigation<NavProps>();
  const [amount, setAmount] = React.useState("");
  const [repeatDay, setRepeatDay] = React.useState(weekDaysArray[3]);
  const [repeatName, setRepeatName] = React.useState(repeatInterval[0]);
  const [name, setName] = React.useState("Salary");
  const [startDate, setStartDate] = React.useState(new Date());

  const currentDate = moment();
  console.log("currentDate", currentDate);
  const startOfWeek = moment().startOf("week");
  const repeatDay1 = moment().day(repeatDay);
  console.log("repeatDay", repeatDay);
  console.log("Start of week)", startOfWeek);
  console.log("repeatDay1;", repeatDay1.format());
  console.log("Moment isSameOrBefore", moment().isSameOrBefore(repeatDay1));
  const nextIncomeDate = moment(repeatDay1).add(7, "days");
  console.log("nextIncomeDate", nextIncomeDate.format());

  const onDateChange = (event: any, newDate?: Date | undefined) => {
    // setShowDatePicker(false);
    console.log("newDate", newDate);
    if (event && newDate) {
      setStartDate(newDate);
    }
  };
  const onPressSave = async () => {
    if (!amount) return;

    console.log("moment.locale();", moment.locale());

    const id = Math.floor(Math.random() * 100);
    const nextPayDate = moment().day(repeatDay);
    const income = new Income(
      id,
      parseInt(amount),
      name,
      repeatName,
      repeatDay,
      nextPayDate.toDate()
    );
    console.log("income onPressSave", income);
    await setItem("income", JSON.stringify(income));
    navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paramsContainer}>
        <View style={styles.inputsContainer}>
          <TextInput
            mode="outlined"
            onChangeText={setName}
            value={name}
            label="Name of the income"
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            onChangeText={setName}
            value={amount}
            label="Amount"
            style={styles.input}
            keyboardType="numeric"
          />
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
          <Picker
            selectedValue={repeatDay}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setRepeatDay(itemValue);
            }}
          >
            {weekDaysArray.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={onPressSave}
            mode="contained"
            color="#381938"
            accessibilityLabel="Save income"
          >
            Save income
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paramsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  inputsContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  picker: {
    backgroundColor: "white",
    width: "100%",
  },
});

export default IncomeInput;

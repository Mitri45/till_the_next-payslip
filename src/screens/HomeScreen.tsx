import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import MoneyToSpend from "../components/MoneyToSpend";
import { FAB, Portal, Provider } from "react-native-paper";
import { HomeStackParamList } from "./Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { incomeState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";

type NavProps = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: NavProps) {
  const { navigate } = navigation;
  const [stateFAB, setStateFAB] = React.useState({ open: false });
  const { open } = stateFAB;
  const onStateChange = ({ open }: { open: boolean }) => setStateFAB({ open });
  const income = useRecoilValue(incomeState);
  console.log("income in HOME", income);
  return (
    <SafeAreaView style={styles.container}>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        {income.length > 0 && <MoneyToSpend />}
      </React.Suspense>
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            visible={true}
            icon={open ? "minus" : "plus"}
            actions={[
              {
                icon: "currency-usd",
                label: "Income",
                onPress: () => {
                  navigate("AddIncome");
                },
              },
              {
                icon: "currency-usd-off",
                label: "Expenses",
                onPress: () => {
                  if (!income) return;
                  navigate("AddExpense");
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "red",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

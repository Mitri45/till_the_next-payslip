import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import MoneyToSpend from "../components/MoneyToSpend";
import { FAB, Portal, Provider } from "react-native-paper";
import { HomeStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expensesState, incomeState } from "../recoil/atoms";
import { Expense } from "../utils/ExpenseClass";
import { getAllKeys, getItem } from "../utils/AsyncStorageUtils";
import { Income } from "../utils/IncomeClass";

type NavProps = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: NavProps) {
  const setExpenses = useSetRecoilState(expensesState);
  const [income, setIncome] = useRecoilState(incomeState);

  const { navigate } = navigation;
  const [stateFAB, setStateFAB] = React.useState({ open: false });
  const { open } = stateFAB;
  const onStateChange = ({ open }: { open: boolean }) => setStateFAB({ open });

  React.useEffect(() => {
    const initAppState = async () => {
      try {
        const getIncome = await getItem("income");
        const incomeToAdd: Income[] = [];
        if (getIncome) {
          incomeToAdd.push(JSON.parse(getIncome));
          setIncome(incomeToAdd);
          console.log("income ARR", incomeToAdd);
        }
        const keys = await getAllKeys();
        if (keys && keys.length > 0) {
          const expensesToAdd: Expense[] = [];
          const filteredKeys = keys.filter((item) => item !== "income");
          for (let i = 0; i < filteredKeys.length; i++) {
            const getExpense = await getItem(filteredKeys[i]);
            if (getExpense) {
              expensesToAdd.push(JSON.parse(getExpense));
            }
          }
          console.log("expensesToAdd", expensesToAdd);
          setExpenses(expensesToAdd);
        }
      } catch (e) {
        console.log("error", e);
      }
    };
    initAppState();
  }, []);

  console.log("income HOME", income);
  const componentToRender =
    income.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <MoneyToSpend />
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
    ) : (
      <SafeAreaView style={styles.container}>
        <Text>No income set, click plus icon to add</Text>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigate("AddIncome")}
        />
      </SafeAreaView>
    );

  return componentToRender;
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

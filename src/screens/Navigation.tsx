import React from "react";
import HomeScreen from "./HomeScreen";
import AddExpense from "./AddExpense";
import ExpensesList from "../components/Expenses/ExpensesList";
import AddIncome from "./AddIncome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IncomeList from "../components/Income/IncomeList";
import { MaterialIcons } from "@expo/vector-icons";
import { RecoilRoot } from "recoil";
import { LogBox } from "react-native";
import { useRecoilValue } from "recoil";
import { SafeAreaView } from "react-native-safe-area-context";
import InitialSetupSwipe from "../components/InitialSetup/InitialSetupSwipe";
import { getAllKeys, getItem } from "../utils/AsyncStorageUtils";
import { Income } from "../utils/IncomeClass";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expensesState, incomeState } from "../recoil/atoms";

import { Expense } from "../utils/ExpenseClass";

LogBox.ignoreLogs(["timer"]);

export type RootStackParamList = {
  HomeScreen: undefined;
  Expenses: undefined;
  Income: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  AddIncome: undefined;
};

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AddExpense" component={AddExpense} />
      <HomeStack.Screen name="AddIncome" component={AddIncome} />
    </HomeStack.Navigator>
  );
}

export default function Navigation() {
  const [income, setIncome] = useRecoilState(incomeState);
  const setExpenses = useSetRecoilState(expensesState);

  React.useEffect(() => {
    const initAppState = async () => {
      try {
        const getIncome = await getItem("income");
        if (getIncome) {
          setIncome([JSON.parse(getIncome)]);
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
          setExpenses(expensesToAdd);
        }
      } catch (e) {
        console.log("error", e);
      }
    };
    initAppState();
  }, []);
  console.log("income NAV", income);
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      {income.length > 0 ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: "home" | "attach-money" | "money-off";
              switch (route.name) {
                case "HomeScreen":
                  iconName = "home";
                  break;
                case "Expenses":
                  iconName = "money-off";
                  break;
                case "Income":
                  iconName = "attach-money";
                  break;
              }
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="HomeScreen"
            options={{ headerShown: false }}
            component={HomeStackScreen}
          />
          <Tab.Screen name="Expenses" component={ExpensesList} />
          <Tab.Screen name="Income" component={IncomeList} />
        </Tab.Navigator>
      ) : (
        <InitialSetupSwipe />
      )}
    </NavigationContainer>
  );
}

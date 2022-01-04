import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import AddExpense from "./src/screens/AddExpense";
import ExpensesList from "./src/components/ExpensesList";
import AddIncome from "./src/screens/AddIncome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IncomeList from "./src/components/IncomeList";
import { MaterialIcons } from "@expo/vector-icons";
import { RecoilRoot } from "recoil";

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

export default function App() {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <RecoilRoot>
      <PaperProvider>
        <NavigationContainer>
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
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  );
}

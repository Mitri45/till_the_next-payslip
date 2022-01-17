import { selector } from "recoil";
import { expensesState, incomeState } from "./atoms";

export const getMoneyToSpendQuery = selector({
  key: "getMoneyToSpend",
  get: ({ get }) => {
    const expenses = get(expensesState);
    const income = get(incomeState);
    console.log("income GETmo", income);
    let expensesAmount = 0;
    for (const expense of expenses) {
      const { amount } = expense;
      expensesAmount += amount;
    }
    const incomeAmount = income[0].amount;
    return incomeAmount - expensesAmount;
  },
});

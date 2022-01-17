import { atom } from "recoil";
import { Expense } from "../utils/ExpenseClass";
import { Income } from "../utils/IncomeClass";

export const expensesState = atom<Expense[]>({
  key: "expensesState",
  default: [],
});
export const incomeState = atom<Income[]>({
  key: "incomeState",
  default: [],
});

export const currentBalance = atom<number>({
  key: "currentBalance",
  default: 0,
});

export const spendTillPayday = atom<number>({
  key: "spendTillPayday",
  default: 0,
});

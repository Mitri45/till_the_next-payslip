import moment from "moment";
moment.updateLocale("nz", {
  week: {
    dow: 1,
  },
});
export const weekDays = moment.weekdays(true);
export const repeatInterval = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
] as const;

export type IncomeTypeRepeat = typeof repeatInterval[number];
export type IncomeTypeWeekDay = typeof weekDays[number];

export class Income {
  id: number;
  amount: number;
  name: string;
  repeatDay: IncomeTypeWeekDay;

  constructor(
    name: string,
    amount: number,
    repeatDay: IncomeTypeWeekDay,
    id: number
  ) {
    this.name = name;
    this.amount = amount;
    this.repeatDay = repeatDay;
    this.id = id;
  }
}

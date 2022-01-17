import moment from "moment";
export const weekDaysArray = moment.weekdays(true);

export const repeatInterval = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
] as const;

export type IncomeTypeRepeat = typeof repeatInterval[number];
export type IncomeTypeWeekDay = typeof weekDaysArray[number];

export class Income {
  id: number;
  amount: number;
  name: string;
  repeatInterval: IncomeTypeWeekDay;
  repeatDayOfTheWeek: IncomeTypeWeekDay;
  nextPayDate: Date;

  constructor(
    id: number,
    amount: number,
    name: string,
    repeatInterval: IncomeTypeWeekDay,
    repeatDayOfTheWeek: IncomeTypeWeekDay,
    nextPayDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.repeatInterval = repeatInterval;
    this.repeatDayOfTheWeek = repeatDayOfTheWeek;
    this.nextPayDate = nextPayDate;
  }
}

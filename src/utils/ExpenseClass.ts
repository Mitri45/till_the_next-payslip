import moment from "moment";
export const repeatInterval = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "Yearly",
] as const;

export type RepeatInterval = typeof repeatInterval[number];

export class Expense {
  name: string;
  amount: number;
  startDate: Date;
  nextPayDate: Date;
  endDate: Date;
  repeatable: boolean;
  repeatInterval: RepeatInterval;
  id: number;

  constructor(
    name: string,
    amount: number,
    startDate: Date,
    nextPayDate: Date,
    endDate: Date,
    repeatable: boolean,
    repeatInterval: RepeatInterval,
    id: number
  ) {
    this.amount = amount;
    this.name = name;
    this.startDate = startDate;
    this.nextPayDate = nextPayDate;
    this.endDate = endDate;
    this.repeatable = repeatable;
    this.repeatInterval = repeatInterval;
    this.id = id;
  }
}

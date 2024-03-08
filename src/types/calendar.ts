export interface ITransactions {
  date: string;
  transactionType: string;
  amount: number;
  description: string;
}

export interface IDateSelectArg {
  date: Date;
  dateStr: string;
  allDay: boolean;
  view: {
    type: string;
  };
}

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

export interface TotalAmounts {
  totalIncome: number;
  totalExpenses: number;
}

/** Create.tsx */
export interface CreateProps {
  selectedDate: string;
  setModalClose: (value: boolean) => void;
}

export interface ICreateForm {
  date: string;
  transactionType: string;
  amount: number;
  description: string;
}

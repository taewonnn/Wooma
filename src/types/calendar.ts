export interface ITransactions {
  date: string;
  memberGroupId: string;
  memberId: string;
  amount: number;
  description: string;
  UUID: string;
  id: string;
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
  totalExpenses: number;
}

/** Create.tsx */

export interface ICreateExpenseForm {
  date: string;
  transactionType: string;
  amount: number;
  description: string;
  UUID: string;
}

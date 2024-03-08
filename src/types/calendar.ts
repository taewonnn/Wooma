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

export interface IInfo {
  el: object;
  event: {
    _def: {
      extendedProps: {
        type: string;
      };
      defId: string;
      title: string;
    };
  };
  jsEvent: object;
  view: object;
}

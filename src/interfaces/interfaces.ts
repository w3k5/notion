export enum BankType {
  HOME_CREDIT = 'Home Credit',
  CREDIT_CARD_TINKOFF = 'Credit Card Tinkoff',
  TINKOFF = 'Tinkoff',
  SBERBANK = 'Sberbank',
  ALFA_BANK = 'Alfa Bank',
  TINKOFF_VR = 'Tinkoff VR',
}

export interface LoanInterface {
  bank: BankType;
  isPaid: boolean;
  payment: number;
  rawDate: string;
  paymentDate?: string;
}

import * as dayjs from 'dayjs';
import { BankType, LoanInterface } from '../interfaces/interfaces';

export class Loan implements LoanInterface {
  bank: BankType;
  isPaid: boolean;
  payment: number;
  paymentDate?: string;
  rawDate: string;

  constructor({ bank, isPaid, payment, rawDate }: LoanInterface) {
    this.bank = bank;
    this.isPaid = isPaid;
    this.payment = payment;
    this.paymentDate = this.getDate(rawDate);
  }

  getUnix(): number {
    return new Date(this.paymentDate).getTime();
  }

  private getDate(raw: string): string {
    const date = dayjs(raw);

    if (date.isValid) {
      return date.toString();
    } else {
      throw new Error(`Date: ${raw} is not valid!`);
    }
  }
}

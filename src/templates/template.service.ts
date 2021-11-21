import { Injectable } from '@nestjs/common';
import { Loan } from 'src/models/loan.model';
import * as dayjs from 'dayjs';

@Injectable()
export class TemplateService {
  create({ bank, payment, paymentDate }: Loan): string {
    const bankLine = `**Банк: ${bank}**`;
    const paymentLine = `**Долг:** ${payment
      .toString()
      .split('.')
      .join(',')} ₽`;
    const dateLine = `**Дата платежа: ${dayjs(paymentDate).format(
      'DD MMMM YYYY',
    )}**`;
    return this.concatLines(bankLine, paymentLine, dateLine);
  }

  private concatLines(...lines: string[]): string {
    return lines.reduce((acc, val) => `${acc}\n${val}`, '');
  }
}

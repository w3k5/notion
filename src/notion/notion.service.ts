import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { TemplateService } from 'src/templates/template.service';
import { Loan } from '../models/loan.model';

@Injectable()
export class NotionService {
  constructor(private template: TemplateService) {}
  notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  loans: Loan[];

  root(): string {
    return 'Hello world!';
  }

  async getAllLoans(): Promise<Loan[]> {
    try {
      const database = await this.notion.databases.query({
        database_id: process.env.DATABASE_ID,
      });

      const { results } = database;

      const mapped = results
        .map((loan) => {
          const { properties } = loan;
          const bank = properties['Bank']['select']['name'];
          const payment = properties['Платеж']['number'];
          const isPaid = properties['Оплачено']['checkbox'];
          const rawDate = properties['Дата']['date']['start'];
          const instance = new Loan({ bank, isPaid, payment, rawDate });
          return instance;
        })
        .sort((a, b) => a.getUnix() - b.getUnix());

      this.loans = mapped;
      return mapped;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          message: 'Что то пошло не так в момент загрузки базы данных',
          error,
        }),
      );
    }
  }

  async getClosestLoan(): Promise<Loan> | null {
    if (this.loans) {
      return this.findClosestLoan();
    } else {
      await this.getAllLoans();
      return this.findClosestLoan();
    }
  }

  async getFullLoan(): Promise<number> {
    if (this.loans) {
      return this.loans.reduce((sum, loan) => {
        if (!loan.isPaid) {
          return sum + loan.payment;
        }
        return sum;
      }, 0);
    } else {
      return 0;
    }
  }

  private findClosestLoan(): Loan | null {
    const closestLoan = this.loans.find((loan) => !loan.isPaid);
    if (closestLoan) {
      return closestLoan;
    } else {
      return null;
    }
  }
}

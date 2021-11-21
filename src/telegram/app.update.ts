import { NotionService } from './../notion/notion.service';
import { Update, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { Context } from './context.interface';
import { TemplateService } from 'src/templates/template.service';

@Update()
export class TelegramUpdate {
  constructor(
    private notion: NotionService,
    private template: TemplateService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async helpCommand(ctx: Context) {
    console.log(ctx);
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    this.notion.root();
    await ctx.reply(this.notion.root());
  }

  @Command('loans')
  async sendLoans(ctx: Context) {
    try {
      const reply = await this.notion.getAllLoans();
      for (const loan of reply) {
        await ctx.reply(JSON.stringify(loan));
      }
    } catch (error) {
      await ctx.reply(error.response.description);
    }
  }

  @Command('closest')
  async sendClosestLoan(ctx: Context) {
    try {
      const reply = await this.notion.getClosestLoan();
      console.log('reply', reply);
      if (reply) {
        await ctx.reply(this.template.create(reply), {
          parse_mode: 'MarkdownV2',
        });
      } else {
        await ctx.reply('У вас нет долгов!');
      }
    } catch (error) {
      console.log(error);
      await ctx.reply(error.response.description);
    }
  }

  @Command('month')
  async sendMonthLoans(ctx: Context) {
    await ctx.reply('Month');
  }

  @Command('full')
  async sendFullLoan(ctx: Context) {
    const fullLoan = await this.notion.getFullLoan();
    await ctx.reply(`Полный долг: ${Math.trunc(fullLoan)}`);
  }
}

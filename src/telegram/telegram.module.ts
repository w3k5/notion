import { Module } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import { TemplateService } from 'src/templates/template.service';
import { TelegramUpdate } from './app.update';

@Module({
  providers: [TelegramUpdate, NotionService, TemplateService /* EchoService */],
})
export class TelegramModule {}

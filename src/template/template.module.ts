import { Module } from '@nestjs/common';
import { HandlebarsTemplateEngineService } from './handlebars-template-engine.service';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';

@Module({
  providers: [HandlebarsTemplateEngineService, TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService, HandlebarsTemplateEngineService],
})
export class TemplateModule {}

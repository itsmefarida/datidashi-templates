import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { TemplateEngine } from './template-engine.interface';

@Injectable()
export class HandlebarsTemplateEngineService implements TemplateEngine {
  private handlebars = Handlebars;

  render(template: string, context: Record<string, any>): string {
    const compiled = this.handlebars.compile(template, { strict: true });
    return compiled(context);
  }

  compile(template: string): (context: Record<string, any>) => string {
    return this.handlebars.compile(template, { strict: true });
  }

  registerHelper(name: string, helper: (...args: any[]) => any): void {
    this.handlebars.registerHelper(name, helper);
  }

  registerPartial(name: string, partial: string): void {
    this.handlebars.registerPartial(name, partial);
  }
}

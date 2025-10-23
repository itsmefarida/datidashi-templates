export interface TemplateEngine {
  render(template: string, context: Record<string, any>): string;
  compile(template: string): (context: Record<string, any>) => string;
  registerHelper(name: string, helper: (...args: any[]) => any): void;
  registerPartial(name: string, partial: string): void;
}

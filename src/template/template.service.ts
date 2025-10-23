import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { HandlebarsTemplateEngineService } from './handlebars-template-engine.service';
import { AllConfigType } from '../config/config.type';

export interface RenderOptions {
  layout?: string;
  theme?: string;
  regions?: Record<string, string>;
  partials?: Record<string, string>;
}

@Injectable()
export class TemplateService {
  private templatesPath: string;
  private themesPath: string;

  constructor(
    private readonly templateEngine: HandlebarsTemplateEngineService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    this.templatesPath = path.join(
      this.configService.getOrThrow('app.workingDirectory', { infer: true }),
      'src',
      'template',
      'templates',
    );
    this.themesPath = path.join(
      this.configService.getOrThrow('app.workingDirectory', { infer: true }),
      'src',
      'template',
      'themes',
    );

    this.registerDefaultHelpers();
  }

  private registerDefaultHelpers(): void {
    // Helper untuk inject content ke regions
    this.templateEngine.registerHelper('region', (name: string, options) => {
      const regions = options.data?.root?.regions || {};
      return regions[name] || '';
    });

    // Helper untuk include partials
    this.templateEngine.registerHelper('partial', function(name: string) {
      const partials = this.partials || {};
      return partials[name] || '';
    });
  }

  async renderTemplate(
    templateName: string,
    context: Record<string, any> = {},
    options: RenderOptions = {},
  ): Promise<string> {
    const layoutName = options.layout || 'default';
    const themeName = options.theme || 'default';

    // Load layout
    const layoutPath = path.join(this.templatesPath, 'layouts', `${layoutName}.hbs`);
    const layoutContent = await fs.readFile(layoutPath, 'utf-8');

    // Load partials
    const partials = await this.loadPartials(themeName);

    // Merge context with regions and partials
    const fullContext = {
      ...context,
      regions: options.regions || {},
      partials,
      theme: themeName,
    };

    // Render layout with context
    return this.templateEngine.render(layoutContent, fullContext);
  }

  private async loadPartials(themeName: string): Promise<Record<string, string>> {
    const partials: Record<string, string> = {};

    // Load global partials
    const globalPartialsPath = path.join(this.templatesPath, 'partials');
    try {
      const globalFiles = await fs.readdir(globalPartialsPath);
      for (const file of globalFiles) {
        if (file.endsWith('.hbs')) {
          const name = path.basename(file, '.hbs');
          const content = await fs.readFile(path.join(globalPartialsPath, file), 'utf-8');
          partials[name] = content;
        }
      }
    } catch (error) {
      // Partials folder might not exist yet
    }

    // Load theme-specific partials
    const themePartialsPath = path.join(this.themesPath, themeName, 'partials');
    try {
      const themeFiles = await fs.readdir(themePartialsPath);
      for (const file of themeFiles) {
        if (file.endsWith('.hbs')) {
          const name = path.basename(file, '.hbs');
          const content = await fs.readFile(path.join(themePartialsPath, file), 'utf-8');
          partials[name] = content; // Override global partials if same name
        }
      }
    } catch (error) {
      // Theme partials folder might not exist yet
    }

    return partials;
  }

  async renderPage(
    pageName: string,
    context: Record<string, any> = {},
    options: RenderOptions = {},
  ): Promise<string> {
    // Load page content
    const pagePath = path.join(this.templatesPath, 'pages', `${pageName}.hbs`);
    const pageContent = await fs.readFile(pagePath, 'utf-8');

    // Load partials for regions
    const partials = await this.loadPartials(options.theme || 'default');

    // Set default regions
    const defaultRegions = {
      header: partials.header || '',
      footer: partials.footer || '',
      navigation: partials.navigation || '',
    };

    // Set content region
    const regions = {
      ...defaultRegions,
      content: pageContent,
      ...options.regions,
    };

    return this.renderTemplate('default', context, { ...options, regions });
  }
}

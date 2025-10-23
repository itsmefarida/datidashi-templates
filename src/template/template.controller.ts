import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplateService, RenderOptions } from './template.service';

@ApiTags('Template')
@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Render('pages/home')
  async renderHome() {
    const options: RenderOptions = {
      layout: 'default',
      theme: 'default',
    };

    const context = {
      title: 'Home - My App',
      appName: 'My App',
      description: 'Welcome to our modern web application',
      lang: 'en',
      year: new Date().getFullYear(),
      features: [
        { title: 'Fast & Secure', description: 'Built with modern technologies for speed and security' },
        { title: 'Responsive Design', description: 'Works perfectly on all devices' },
        { title: 'Easy to Use', description: 'Intuitive interface designed for everyone' },
      ],
      scripts: ['/themes/default/script.js', '/themes/default/home.js'],
      styles: ['/themes/default/home.css'],
    };

    return context;
  }

  @Get('about')
  @Render('pages/about')
  async renderAbout() {
    const options: RenderOptions = {
      layout: 'default',
      theme: 'default',
    };

    const context = {
      title: 'About Us - My App',
      appName: 'My App',
      description: 'Learn more about our company and mission',
      lang: 'en',
      year: new Date().getFullYear(),
      scripts: ['/themes/default/script.js', '/themes/default/about.js'],
      styles: ['/themes/default/about.css'],
    };

    return context;
  }

  @Get('contact')
  @Render('pages/contact')
  async renderContact() {
    const options: RenderOptions = {
      layout: 'default',
      theme: 'default',
    };

    const context = {
      title: 'Contact Us - My App',
      appName: 'My App',
      description: 'Get in touch with our team',
      lang: 'en',
      year: new Date().getFullYear(),
      scripts: ['/themes/default/script.js', '/themes/default/contact.js'],
      styles: ['/themes/default/contact.css'],
    };

    return context;
  }

  @Get('dashboard')
  @Render('pages/dashboard')
  async renderDashboard() {
    const options: RenderOptions = {
      layout: 'default',
      theme: 'default',
    };

    const context = {
      title: 'Dashboard - My App',
      appName: 'My App',
      description: 'Your personal dashboard',
      lang: 'en',
      year: new Date().getFullYear(),
      scripts: ['/themes/default/script.js', '/themes/default/dashboard.js'],
      styles: ['/themes/default/dashboard.css'],
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      stats: [
        { label: 'Total Users', value: '1,234' },
        { label: 'Active Sessions', value: '89' },
        { label: 'Revenue', value: '$12,345' },
      ],
    };

    return context;
  }

  @Get('template/page/:pageName')
  async renderPageApi(
    @Param('pageName') pageName: string,
    @Query('layout') layout?: string,
    @Query('theme') theme?: string,
  ) {
    const options: RenderOptions = {
      layout: layout || 'default',
      theme: theme || 'default',
    };

    const context = {
      title: `${pageName} Page`,
      appName: 'My App',
      description: `Welcome to ${pageName} page`,
      lang: 'en',
      year: new Date().getFullYear(),
    };

    const html = await this.templateService.renderPage(pageName, context, options);
    return { html };
  }

  @Get('template/:templateName')
  async renderTemplate(
    @Param('templateName') templateName: string,
    @Query('layout') layout?: string,
    @Query('theme') theme?: string,
  ) {
    const options: RenderOptions = {
      layout: layout || 'default',
      theme: theme || 'default',
    };

    const html = await this.templateService.renderTemplate(templateName, {}, options);
    return { html };
  }
}

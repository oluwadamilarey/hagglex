import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { CreatePageDatumInput } from './dto/create-page-datum.input';

import * as puppeteer from 'puppeteer';
import { Cache } from 'cache-manager';
import { PageDatum } from './entities/page-datum.entity';

@Injectable()
export class PageDataService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  create(createPageDatumInput: CreatePageDatumInput) {
    return 'This action adds a new pageDatum';
  }

  async getPage(): Promise<PageDatum> {
    try {
      console.log(process.env.REDIS_URL);
      const cachedPage: PageDatum = await this.cacheManager.get(
        'https://www.w3schools.com',
      );
      if (cachedPage) {
        return cachedPage;
      }

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
      });
      const page = await browser.newPage();
      await page.goto('https://www.w3schools.com');

      const page_title: string = await page.title();

      const largest_image: string = await page.evaluate(() => {
        return [...document.getElementsByTagName('img')].sort(
          (a, b) =>
            b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight,
        )[0].src;
      });

      const description: string = await page.evaluate(() => {
        var metaTags = document.getElementsByTagName('meta');

        for (var i = 0; i < metaTags.length; i++) {
          if (metaTags[i].getAttribute('name') == 'Description') {
            return metaTags[i].getAttribute('content');
          }
        }
      });

      const pageData: PageDatum = {
        PageTitle: page_title,
        Description: description,
        LargestImage: largest_image,
      };

      await this.cacheManager.set('https://www.w3schools.com', pageData, {
        ttl: 100,
      });

      return pageData;
    } catch (e) {
      return e.message;
    }
  }

  async getPageWithUrl(url: string): Promise<PageDatum> {
    try {
      const cachedPage: PageDatum = await this.cacheManager.get(
        `https://${url}`,
      );
      if (cachedPage) {
        console.log(cachedPage);
        console.log('using cached Data');
        return cachedPage;
      }

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`https://${url}`);

      const page_title: string = await page.title();

      const largest_image: string = await page.evaluate(() => {
        return [...document.getElementsByTagName('img')].sort(
          (a, b) =>
            b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight,
        )[0].src;
      });

      const description: string = await page.evaluate(() => {
        var metaTags = document.getElementsByTagName('meta');

        for (var i = 0; i < metaTags.length; i++) {
          if (metaTags[i].getAttribute('name') == 'Description') {
            return metaTags[i].getAttribute('content');
          }
        }
      });

      const pageData: PageDatum = {
        PageTitle: page_title,
        Description: description,
        LargestImage: largest_image,
      };

      await this.cacheManager.set(`https://${url}`, pageData, {
        ttl: 100,
      });

      return pageData;
    } catch (e) {
      return e.message;
    }
  }
}

import path from 'path';
import { glob } from 'glob';
import puppeteer from 'puppeteer';

export default async function () {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1200, height: 630 } });
    const page = await browser.newPage();

    const files = await glob('./dist/og/**/*.html');

    for (const file of files) {
        const url = path.resolve(file);
        await page.goto('file://' + url);
        await page.screenshot({ path: file.replace('.html', '.png'), type: 'png' });
    }

    await browser.close();
    console.log('OG images generated');
}

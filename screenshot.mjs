import puppeteer from 'puppeteer';
import path from 'path';
import glob from 'glob';

(async () => {
    // 1. Launch the browser
    const browser = await puppeteer.launch({ defaultViewport: { width: 1200, height: 630 } });

    // 2. Open a new page
    const page = await browser.newPage();

    const files = await glob('./dist/og/**/*.html');

    for (const file of files) {
        const url = path.resolve(file);
        await page.goto('file://' + url);
        // await page.screenshot({ path: 'a-simple-pubsub-module-in-javascript.png' });
        await page.screenshot({ path: file.replace('.html', '.png'), type: 'png' });
    }

    await browser.close();
    console.log('Generated OG images.');
})();

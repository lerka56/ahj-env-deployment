import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should load the page correctly', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.card-validator');
    
    const title = await page.$eval('h2', el => el.textContent);
    expect(title).toContain('Проверка банковской карты');
  });

  test('should validate a valid Visa card', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-input', '4111111111111111');
    await page.click('#validate-btn');
    
    await page.waitForTimeout(500);
    
    const validityText = await page.$eval('#card-validity', el => el.textContent);
    expect(validityText).toContain('валиден');
  });

  test('should detect card system during input', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-input', '5555');
    
    const activeIcon = await page.$('.card-icon.active');
    expect(activeIcon).not.toBeNull();
    
    const system = await activeIcon.evaluate(el => el.dataset.system);
    expect(system).toBe('mastercard');
  });

  test('should show error for invalid card', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-input', '4111111111111112');
    await page.click('#validate-btn');
    
    await page.waitForTimeout(500);
    
    const validityText = await page.$eval('#card-validity', el => el.textContent);
    expect(validityText).toContain('невалиден');
  });
});
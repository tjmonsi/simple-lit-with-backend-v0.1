import { test, expect } from '@playwright/test';
import { processCoverage } from '../utils/process-coverage.js';

test.describe('basic set', async () => {
  const filePort = 8080;
  const host = 'localhost';
  const baseUrl = `${host}:${filePort}`;

  test.use({
    // @ts-ignore
    baseUrl
  });

  test('basic test', async ({ page }) => {
    await page.coverage.startJSCoverage({ resetOnNavigation: false });
    await page.goto('/test');

    await page.waitForSelector('a');

    const coverage = await page.coverage.stopJSCoverage();

    await processCoverage(coverage);

    const body = await page.locator('body');

    await expect(body).toHaveText('Hello Test Not found');
  });
});

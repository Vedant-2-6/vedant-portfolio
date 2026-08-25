import { test, expect } from '@playwright/test';

test('capture console errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', exception => {
    errors.push("Uncaught exception: " + exception.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push("Console error: " + msg.text());
    }
  });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  
  if (errors.length > 0) {
    throw new Error('Browser errors found:\\n' + errors.join('\\n'));
  }
});

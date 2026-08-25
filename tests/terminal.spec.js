import { test, expect } from '@playwright/test';

test.describe('VedantOS Terminal Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the local dev server
    await page.goto('http://localhost:5173');
  });

  test('should display the welcome message', async ({ page }) => {
    await expect(page.locator('text=Welcome to VedantOS')).toBeVisible();
    await expect(page.locator('text=Type "help" to see available commands.')).toBeVisible();
  });

  test('should execute the "about" command and display CV summary', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await input.fill('about');
    await input.press('Enter');

    // It should output the about section from the CV
    await expect(page.locator('text=Cloud Infrastructure, DevOps & AI Full-Stack Engineer')).toBeVisible();
  });

  test('should execute the "experience" command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await input.fill('experience');
    await input.press('Enter');

    // It should show Simform Solutions
    await expect(page.locator('text=Simform Solutions | DevOps & Cloud')).toBeVisible();
  });

  test('should handle unknown commands gracefully', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await input.fill('rm -rf /');
    await input.press('Enter');

    // It should display a command not found error
    await expect(page.locator('text=command not found: rm -rf /')).toBeVisible();
  });
});

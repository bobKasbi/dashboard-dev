import { Page, expect } from '@playwright/test';

export async function loginViaKeycloak(page: Page) {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;

    if (!username || !password) {
        throw new Error('E2E_USERNAME and E2E_PASSWORD must be set for E2E tests');
    }

    // Start at the Angular app (baseURL is set in playwright.config.ts)
    await page.goto('/');

    // Expect redirect to Keycloak realm
    await page.waitForURL('**/realms/dashboard-dev/**', { timeout: 15_000 });

    // Fill username + password on Keycloak login form
    await page.fill('input[name="username"], input#username', username);
    await page.fill('input[name="password"], input#password', password);

    // Click Sign In
    await page.click('button[type="submit"], input[type="submit"]');

    // Wait until we are back on the app and Angular rendered
    await page.waitForURL('**/shop**', { timeout: 15_000 });
    await expect(page.locator('app-root')).toBeVisible();
}

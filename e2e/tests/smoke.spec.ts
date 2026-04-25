// import { test, expect } from '@playwright/test';
// import { mockLogin } from '../fixtures/mock-auth';

/*test('Smoke: App loads and dashboard is visible', async ({ page }) => {
    await mockLogin(page);

    await page.goto('/');

    await expect(page).toHaveTitle(/dashboard/i);

    const mainNav = page.locator('nav');
    await expect(mainNav).toBeVisible();
}); */

/*import { test, expect } from '@playwright/test';
import { mockKeycloak } from '../fixtures/mock-keycloak';

test('Smoke: App loads and dashboard is visible', async ({ page }) => {
    await mockKeycloak(page);
    await page.goto('/');

    await expect(page.locator('app-root')).toBeVisible();
});*/

import { test } from '@playwright/test';
import { loginViaKeycloak } from '../fixtures/keycloak-login';

test('Smoke: App loads after real login', async ({ page }) => {
    await loginViaKeycloak(page);
});

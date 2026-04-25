import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.addInitScript(() => {
        (window as any).Keycloak = function () {
            return {
                init: () => Promise.resolve(true),
                login: () => Promise.resolve(),
                logout: () => Promise.resolve(),
                isLoggedIn: () => Promise.resolve(true),
                token: 'playwright-mock-token',
                getUserRoles: () => ['USER'],
            };
        };
    });

    await browser.close();
}

export default globalSetup;

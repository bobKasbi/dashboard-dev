import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.e2e' });

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    expect: {
        timeout: 5000,
    },

    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,

    reporter: [['list'], ['html', { open: 'never' }], ['line']],

    globalSetup: './e2e/global-setup.ts',

    use: {
        baseURL: process.env.E2E_BASE_URL || 'http://localhost:4200',
        trace: 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        actionTimeout: 60_000,
        navigationTimeout: 60_000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});

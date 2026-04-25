import { Page } from '@playwright/test';
import { mockProducts } from '../mocks/products.mock';

export async function mockProductsApi(page: Page): Promise<void> {
    await page.route('**/products**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockProducts),
        });
    });
}

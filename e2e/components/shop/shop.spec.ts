import { test, expect } from '@playwright/test';
import { loginViaKeycloak } from '../../fixtures/keycloak-login';
import { mockProductsApi } from '../../fixtures/mock-products';

test('Shop renders products after login', async ({ page }) => {
    await mockProductsApi(page);
    await loginViaKeycloak(page);

    const cards = page.getByTestId('shop-product-card');

    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    await expect(page.getByTestId('activity-widget')).toBeVisible();
    await expect(page.getByTestId('filters-widget')).toBeVisible();
});

import { test, expect } from '@playwright/test';

test('Job tracker sheet loads correctly', async ({ page }) => {
    const trackerURL = 'https://docs.google.com/spreadsheets/d/1f4QoBcYw_Jqb7cHbY84nAVTZlXZwmL6u595uw14DDis/edit?usp=sharing'
  await page.goto(trackerURL);

  // Check if the sheet title is correct
  await expect(page).toHaveTitle(/Job_Tracking_Sheet/);




  // Check the  required job columns are visible
 // await expect(page.getByText('Company')).toBeVisible();
 // await expect(page.getByText('Position')).toBeVisible();
 // await expect(page.getByText('Date Applied')).toBeVisible();
 // await expect(page.getByText('Status')).toBeVisible();

});
import { test } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();  // This loads the .env file variables into process.env

test('example test', async ({ page }) => {
    const homePageURL = process.env.URL + ""// Accessing the BASE_URL environment variable
    await page.goto(homePageURL)
    // Additional test code
});

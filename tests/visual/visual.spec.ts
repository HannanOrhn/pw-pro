import { test, expect } from '@playwright/test'

test.describe.only('visual regression testing example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })

  test('full page snapshots', async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  test('single element snapshot', async ({ page }) => {

  const pageTitle = await page.$('h1');

  // Check if pageTitle is not null before proceeding
  if (pageTitle !== null) {
    expect(await pageTitle.screenshot()).toMatchSnapshot("page-title.png");
  } else {
    // Handle the case where 'h1' element is not found
    throw new Error("The 'h1' element was not found on the page.");
  }
})



})

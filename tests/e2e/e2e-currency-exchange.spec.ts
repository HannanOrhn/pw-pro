import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'

test.describe.only('test exchage currency', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.visit()
    await homePage.clickOnSignInButton()
    loginPage.login('username', 'password')

    //click account activity
    await homePage.accountActivityLink.click()
   // await page.pause()
  })

  test('purchase foreign currency', async ({ page }) => {
    //select pay bills tab
    await page.click('#pay_bills_tab')

    //select purchase foreign currency
    await page.click("a[href='#ui-tabs-3']")

    await page.selectOption('#pc_currency', 'CAD')

    const rate = await page.locator('#sp_sell_rate')

    await expect(rate).toContainText('1 dollar (CAD)')

    await page.fill('#pc_amount', '3000')

    await page.click('#pc_inDollars_true')

    await page.click('#pc_calculate_costs')

    const conversionAmount = await page.locator('#pc_conversion_amount')

    await expect(conversionAmount).toBeVisible()
  })
})

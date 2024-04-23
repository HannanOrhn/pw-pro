import{test,expect} from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'

test.describe("New payment", ()=>{

    let homePage: HomePage
    let loginPage: LoginPage

        test.beforeEach(async ({page})=>{
            homePage = new HomePage(page)
            loginPage = new LoginPage(page)
            await homePage.visit()
            await homePage.clickOnSignInButton()
            loginPage.login("username","password")

            //click account activity
            await homePage.accountActivityLink.click()

        })

    test("should send a new payment", async({page})=>{
        //select pay bills tab
        await page.click("#pay_bills_tab")

        await page.selectOption("#sp_payee","apple") //from select dropdown select apple=value
        await page.click("#sp_get_payee_details")

        await page.waitForSelector("#sp_payee_details")

        await page.selectOption("#sp_account","6")

        await page.fill("#sp_amount","5000")

        await page.fill("#sp_date","2024-01-01")

        await page.fill("#sp_description","some message")

        await page.click("#pay_saved_payees")

        const message = await page.locator("#alert_content > span")

        await expect(message).toBeVisible()
        await expect(message).toContainText("The payment was successfully submitted.")

    })

})
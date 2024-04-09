import { test, expect } from "@playwright/test"

test.describe.parallel("Login/logout flow", ()=>{
    //before Hook
    test.beforeEach(async({page})=>{
        await page.goto('http://zero.webappsecurity.com/')
    })

    //nagative
    test("negative scenario for login", async({page})=>{
        await page.click('#signin_button')
        await page.fill('#user_login','invalid user anme')
        await page.fill('#user_password','invalid password')
        await page.click('text=Sign in')

        const error_message = await page.locator('.alert-error')
        await expect(error_message).toContainText('Login and/or password are wrong.')
    })

    //positive
    test('positive scenario for login', async({page})=>{
        await page.click('#signin_button')
        await page.fill('#user_login','username')
        await page.fill('#user_password','password')
        await page.click('text=Sign in')

        await page.goBack()

        await page.click('text=More Services')
        const accountSummaryTab = await page.locator('#account_summary_link')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})

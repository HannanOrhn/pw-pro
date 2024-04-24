import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { HomePage } from "../../pages/HomePage"
import * as dotenv from 'dotenv';


test.describe.parallel("Login/logout flow", ()=>{
    //we created object from LoginPage
    let loginPage: LoginPage
    let homePage: HomePage

    
    dotenv.config()

    //before Hook
    test.beforeEach(async({page})=>{
       // await page.goto('http://zero.webappsecurity.com/')
       //instead of above line

       //initialize loginPage object
       //good practice to initialize inside the hook we don't have to repeat for each test
       loginPage = new LoginPage(page) 
       homePage = new HomePage(page)
       await homePage.visit()
    })

    //nagative
    test("negative scenario for login", async({page})=>{
        await homePage.clickOnSignInButton()
        await page.goBack()
        // await page.fill('#user_login','invalid user anme')
        // await page.fill('#user_password','invalid password')
        // await page.click('text=Sign in')
        await loginPage.login("invalidUsername","invalidPassword")
        await loginPage.wait(3000)
        //const error_message = await page.locator('.alert-error')
        // await expect(error_message).toContainText('Login and/or password are wrong.')
        await loginPage.assertErrorMessage()
    }) 

    //positive
    test('positive scenario for login', async({page})=>{
        await homePage.clickOnSignInButton()
        // await page.fill('#user_login','username')
        // await page.fill('#user_password','password')
        // await page.click('text=Sign in')
        await loginPage.login('username','password')

        await page.goBack()

        await homePage.moreServicesLink.click()
        const accountSummaryTab = await page.locator('#account_summary_link')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})

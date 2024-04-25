import{test} from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import * as dotenv from 'dotenv'

test.describe('login page visual test',()=>{
    let loginPage: LoginPage
    dotenv.config(); 

test.beforeEach(async({page})=>{
   loginPage = new LoginPage(page)
    await loginPage.visit()
    await page.pause()
    await loginPage.clickOnSignInButton()
    await page.pause()
})

test("take login form ss",async({page})=>{
    await loginPage.snapshopLoginForm()
})

test("take the ss for invalid login",async({page})=>{
    await loginPage.loginFuncFail()
    await loginPage.snapshotErrorMessage()
})
})
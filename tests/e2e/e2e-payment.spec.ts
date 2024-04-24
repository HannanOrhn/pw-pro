import{test} from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'
import { Navbar } from '../../pages/components/Navbar'
import { PaymentPage } from '../../pages/PaymentPage'

test.describe("New payment", ()=>{

    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar

        test.beforeEach(async ({page})=>{
            homePage = new HomePage(page)
            loginPage = new LoginPage(page)
            navbar = new Navbar(page)
            paymentPage = new PaymentPage(page)
            await homePage.visit()
            await homePage.clickOnSignInButton()
            loginPage.login("username","password")

            //click account activity
            await homePage.accountActivityLink.click()

        })

    test("should send a new payment", async({page})=>{
        //select pay bills tab
        navbar.clickOnTab("Pay Bills") //in navbar

        await paymentPage.createPayments("6","5000","2024-01-02","something")
        await paymentPage.assertSuccessMessage()
    })

})
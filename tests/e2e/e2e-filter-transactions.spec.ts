import{test,expect} from '@playwright/test'
import{LoginPage} from '../../pages/LoginPage'
import{HomePage} from '../../pages/HomePage'

test.describe('filter transactions', ()=>{
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
        await homePage.signinButton.click()
        await loginPage.login('username','password')
    
        await page.goBack()
    
        await homePage.moreServicesLink.click()
        const transfer_founds = await homePage.transferFounds
        await expect(transfer_founds).toBeVisible()
    
    })

    test('filter transactions',async ({page})=>{
        await homePage.accountActivityLink.click()

        await page.selectOption('#aa_accountId','2')

        const checking_account = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checking_account).toHaveCount(3)

        await page.selectOption('#aa_accountId','4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checking_account).toHaveCount(2)

        await page.selectOption('#aa_accountId','6')
        const noResult = await page.locator('.well')
        await expect(noResult).toBeVisible()
    })
})
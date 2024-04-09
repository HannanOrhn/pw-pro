import{test,expect} from '@playwright/test'

test.describe.only('filter transactions', ()=>{

    test.beforeEach(async({page})=>{
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.fill('#user_login','username')
        await page.fill('#user_password','password')
        await page.click('text=Sign in')
    
        await page.goBack()
    
        await page.click('text=More Services')
        const transfer_founds = await page.locator('#transfer_funds_link')
        await expect(transfer_founds).toBeVisible()
    
    })

    test('filter transactions',async ({page})=>{
        await page.click('#account_activity_link')

        await page.selectOption('#aa_accountId','2')

        const checking_account = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checking_account).toHaveCount(3)

        await page.selectOption('#aa_accountId','4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checking_account).toHaveCount(2)
    })

})
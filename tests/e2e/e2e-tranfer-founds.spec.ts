import{test,expect} from '@playwright/test'
import exp from 'constants'

test.describe('transfer founds',()=>{

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

test('transfering founds and make payments',async({page})=>{
    const transfer_founds = await page.locator('#transfer_funds_link')
    transfer_founds.click()

    const title_transfer_money = await page.locator('.board-header')
    await expect(title_transfer_money).toHaveText('Transfer Money & Make Payments')

    await page.selectOption('select[name="fromAccountId"]','2')
    await page.selectOption('#tf_toAccountId','3')
    await page.fill('#tf_amount','500')
    await page.fill('#tf_description','something')
    await page.click('#btn_submit')

    const boarHeader = await page.locator('.board-header')
    await expect(boarHeader).toHaveText('Transfer Money & Make Payments - Verify')
    await page.click('#btn_submit')

    const alertMessage = await page.locator('.alert-success')
    await expect(alertMessage).toHaveText('You successfully submitted your transaction.')

})

})
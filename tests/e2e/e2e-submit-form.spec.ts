import {test,expect} from '@playwright/test'
import { beforeEach } from 'node:test'

test.describe("feedback form",()=>{

        test.beforeEach(async ({page})=>{
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.click('#feedback')

            await expect(page).toHaveURL('http://zero.webappsecurity.com/feedback.html')
        })

        test('Reset feedback form',async ({page})=>{
            await page.fill('#name','testuser')
            await page.fill('#email','test@gmail.com')
            await page.fill('#subject','feedback subject')
            await page.fill('#comment','some feedback test ....')
            await page.click('input[name="clear"]')

            const nameInput = await page.locator('#name')
            const comment = await page.locator('#comment')

            await expect(nameInput).toBeEmpty()
            await expect(comment).toBeEmpty()

        })

        test('Submit feedback form', async ({page})=>{
            await page.fill('#name','testuser')
            await page.fill('#email','test@gmail.com')
            await page.fill('#subject','feedback subject')
            await page.fill('#comment','some feedback test ....')
            await page.click('input[name="submit"]')

            //another short way to do assertion
            await page.waitForSelector('#feedback-title')
            
        })

})
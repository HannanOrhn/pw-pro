import {test,expect} from '@playwright/test'
import { FeedbackPage } from '../../pages/FeedbackPage'
import { HomePage } from '../../pages/HomePage'

test.describe("feedback form",()=>{
    let feedbackPage: FeedbackPage
    let homePage: HomePage

        test.beforeEach(async ({page})=>{
            feedbackPage = new FeedbackPage(page)
            homePage = new HomePage(page)
            await homePage.visit()
            await homePage.feedBackLink.click()

            await expect(page).toHaveURL('http://zero.webappsecurity.com/feedback.html')
        })

        test('Reset feedback form',async ({page})=>{
            await feedbackPage.fillForm('testuser','test@gmail.com','feedback subject','something bla bla ..')
            await feedbackPage.clearForm()

            const nameInput = await feedbackPage.name
            const comment = await feedbackPage.comment

            await expect(nameInput).toBeEmpty()
            await expect(comment).toBeEmpty()

        })

        test('Submit feedback form', async ({page})=>{
            await feedbackPage.fillForm('testuser','test@gmail.com','feedback subject','something bla bla ..')
            await feedbackPage.submitForm

            //another short way to do assertion
            await page.waitForSelector('#feedback-title')
            
        })

})
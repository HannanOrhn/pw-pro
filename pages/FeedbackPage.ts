import{expect, Locator, Page} from '@playwright/test'

export class FeedbackPage{
    readonly page: Page
    readonly name: Locator
    readonly email: Locator
    readonly subject: Locator
    readonly comment: Locator
    readonly clearButton: Locator
    readonly submitButton: Locator
    readonly feedbackTittle: Locator

    constructor(page: Page){
        this.page = page
        this.name = page.locator('#name')
        this.email = page.locator('#email')
        this.subject = page.locator('#subject')
        this.comment = page.locator('#comment')
        this.clearButton = page.locator('input[name="clear"]')
        this.submitButton = page.locator('input[name="submit"]')
        this.feedbackTittle = page.locator('#feedback-title')
    }

    async fillForm(name: string, email: string, subject:string ,comment: string){
        await this.name.fill(name)
        await this.email.fill(email)
        await this.subject.fill(subject)
        await this.comment.fill(comment)
    }

    async submitForm(){
        await this.submitButton.click()
    }
    async clearForm(){
        await this.clearButton.click()
    }
}
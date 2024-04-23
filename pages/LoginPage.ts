import{expect, Locator, Page} from '@playwright/test'
import { AbstractPage } from './AbstractPage.spec'

export class LoginPage extends AbstractPage{
    //define selectors
    //readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    //Init selectors using constructor --> Selenium-PageFactory.init()
    constructor(page: Page){
       // this.page = page -> since we extended abstract class we don't need it
        super(page)//constructor call from parent
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
    }

    async login(username: string, password:string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
        await this.page.goBack()
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText("Login and/or password are wrong.")
    }
}
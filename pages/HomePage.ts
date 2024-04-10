import{expect, Locator, Page} from '@playwright/test'

export class HomePage{
 //define selectors
 readonly page: Page
 readonly signinButton: Locator
 readonly moreServicesLink: Locator
 readonly searchBox: Locator
 readonly numberOfLinks: Locator

 //create a constructor in order to initialize elements
 constructor(page:Page){
    this.page= page
    this.signinButton = page.locator('#signin_button')
    this.moreServicesLink = page.locator('text=More Services')
    this.searchBox = page.locator('#searchTerm')
    this.numberOfLinks = page.locator('li > a')
 }

 async visit(){
    await this.page.goto('http://zero.webappsecurity.com/') 
}
 async clickOnSignInButton(){
   await this.signinButton.click()
 }
 async searchFor(phrase: string){
   await this.searchBox.fill(phrase)
   await this.page.keyboard.press('Enter')
 }
}
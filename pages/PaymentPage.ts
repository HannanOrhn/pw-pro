import{expect, Locator, Page} from '@playwright/test'

export class PaymentPage{
    readonly page:Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailButton: Locator
    readonly actualPayeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    constructor(page:Page){
        this.page=page
        this.payeeSelectBox = page.locator("#sp_payee")
        this.payeeDetailButton = page.locator("#sp_get_payee_details")
        this.actualPayeeDetail=page.locator("#sp_payee_details")
        this.accountSelectBox = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")
    }

    async createPayments(option:string, amaount:string,date:string,description:string){
        await this.payeeSelectBox.selectOption("apple")
        await this.payeeDetailButton.click()
        await this.actualPayeeDetail.isVisible()
        await this.accountSelectBox.selectOption(option)
        await this.amountInput.fill(amaount)
        await this.dateInput.fill(date)
        await this.descriptionInput.fill(description)
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage(){
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText("The payment was successfully submitted.")
    }
}
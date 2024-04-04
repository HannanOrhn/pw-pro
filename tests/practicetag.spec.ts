import{test,expect} from '@playwright/test'
import{loadHomePage,assertTittle,assertTittleForFaild} from '../helpers'

test("test helpers", async ({page})=>{
    await loadHomePage(page)
    //await page.pause()
    await assertTittle(page)
    await assertTittleForFaild(page)
})

test('Assertion practice @myTag', async ({page})=>{
    await page.goto('https://example.com/')
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');

    //element assertions
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
})

test("simple basic test2 @myTag", async({page}) => {
    //codes go here
    await page.goto("https://www.example.com")

    const pageTitle = await page.locator("h1")

    await expect(pageTitle).toContainText("Example Domain")
})

test.describe.parallel.only('Hooks', ()=>{
    //beforeAll method is our hooks
test.beforeEach(async({page})=>{
    await page.goto('https://example.com/')
})

    test("Screenshots", async ({page})=>{
        //take ss of full page
        await page.screenshot({path: "screenshot.png", fullPage:true})
    
    })
    
    test("Single element Screenshots", async ({page})=>{
            //take ss of single element    
        const element = await page.$('h1')
        await element?.screenshot({path:"single_element_screenshot.png"})
  
    })
})


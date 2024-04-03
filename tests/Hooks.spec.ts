import{test,expect} from '@playwright/test'

test.describe('Hooks', ()=>{
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
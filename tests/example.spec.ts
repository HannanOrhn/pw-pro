import {test, expect} from '@playwright/test'

test("simple basic test", async({page}) => {
    //codes go here
    await page.goto("https://www.example.com");

    const pageTitle = await page.locator("h1");

    await expect(pageTitle).toContainText("Example Domain");
})

//test.only("assertions", async({page})=>{
test("assertions", async({page})=>{
    await page.goto('https://example.com/')
    await expect(page).toHaveURL('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')

    //element assertions
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
})

test.skip("selectors", async ({page}) => {
    //text
    await page.click("text=some text");

    //css 
    await page.click('button');

    //id
    await page.click('#id');

    //class
    await page.click('.class');

    //only visible css
    await page.click('.submit-button:visible');

    //combinations
    await page.click('#username .firt');

    //xpath
    await page.click('//button');
})

//grouping the test scripts

test.describe("my first test suit", ()=>{

    test("Clicking on elements", async({page}) => {
        await page.goto("http://zero.webappsecurity.com");
    
        //locate by using id
        await page.click("#signin_button");
    
        //locate by using text
        await page.click("text=Sign in");
    
        //locate by using class and store in the variable
        const errorMessage = await page.locator(".alert-error");
    
        //do assertion
        await expect(errorMessage).toContainText("Login and/or password are wrong.");
    })
    
    test("working with inputs", async ({page}) =>{
        await page.goto("http://zero.webappsecurity.com");
    
        await page.click("#signin_button");
    
        //fill the form
        await page.fill("#user_login","hannan");
        await page.fill("#user_password",'123456');
    
        //click sign in
        await page.click("text=Sign in");
    
        //locate by using class and store in the variable
        const errorMessage = await page.locator(".alert-error");
    
        //do assertion
        await expect(errorMessage).toContainText("Login and/or password are wrong.");
    
    } )

})


/*
Run test → npx playwright test
-Headless mode to see the browser opening and performing testing on front of us → npx playwright test –headed

Run in specific/all browser → 
npx playwright test –browser=firefox
npx playwright test –browser=all
			npx playwright test –headed –browser=firefox

Spesific test run → npx playwright test tests/example.spec.ts
*/

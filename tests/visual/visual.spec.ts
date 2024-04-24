import{test,expect} from "@playwright/test"

test.describe("visual regression testing example",()=>{

test("full page snapshots",async({page})=>{
    await page.goto("https://www.example.com")
    expect(await page.screenshot()).toMatchSnapshot("homepage.png")
})

})
export async function loadHomePage(page){
    await page.goto('https://www.example.com')
}

export async function assertTittle(page){
    await page.waitForSelector('h1')
}

export async function assertTittleForFaild(page){
    await page.waitForSelector('h5')
}
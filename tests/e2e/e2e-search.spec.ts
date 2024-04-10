import{test,expect} from '@playwright/test'
import { HomePage } from '../../pages/HomePage'

test.describe.only('search result',()=>{
    test('should find search result',async({page})=>{
        let homePage: HomePage = new HomePage(page)
        await homePage.visit()
        await homePage.searchFor('bank')

        const numberOfLinks = await homePage.numberOfLinks
        await expect(numberOfLinks).toHaveCount(2)
    })
})
import {test,expect} from '@playwright/test'

test.describe.parallel('Api Testing',()=>{
    const baseURL='https://reqres.in/api'
    test('Simple api test - Assert successful response status', async({request})=>{
         //instead of page we have request in api testing
        const response = await request.get(baseURL+'/users/2')
        expect(response.status()).toBe(200)
    })

    test('Simple API Test - Assert Invalid Endpoint',async({request})=>{
        const response = await request.get(baseURL+'/users/225252')
        expect(response.status()).toBe(404)
    })

    test('Simple api test parsing response and do assertion', async({request})=>{
        //instead of page we have request in api testing
       const response = await request.get(baseURL+'/users/3')

       //verify the successful status code first
       expect(response.status()).toBe(200)

       //parse the response as a JSON and store in the responseBody variable
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
   })

})
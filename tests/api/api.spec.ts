import {test,expect} from '@playwright/test'
import { request } from 'http'

test.describe.parallel.only('Api Testing',()=>{
    const baseURL='https://reqres.in/api'
    test('Simple api test - Assert successful response status', async({request})=>{ //instead of page we have request in api testing
        const response = await request.get(baseURL+'/users/2')
        expect(response.status()).toBe(200)
    })


})
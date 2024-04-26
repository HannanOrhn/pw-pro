import { test, expect } from '@playwright/test'
import { request } from 'http'

test.describe.parallel('Api Testing', () => {
  const baseURL = 'https://reqres.in/api'

  test('Simple api test - Assert successful response status', async ({
    request,
  }) => {
    //instead of page we have request in api testing
    const response = await request.get(baseURL + '/users/2')
    expect(response.status()).toBe(200)
  })

  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(baseURL + '/users/225252')
    expect(response.status()).toBe(404)
  })

  test('Simple api test parsing response and do assertion', async ({
    request,
  }) => {
    //instead of page we have request in api testing
    const response = await request.get(baseURL + '/users/3')

    //verify the successful status code first
    expect(response.status()).toBe(200)

    //parse the response as a JSON and store in the responseBody variable
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })

  test('Get request - Get user details', async ({ request }) => {
    const response = await request.get(baseURL + '/users/1')
    const responseBody = JSON.parse(await response.text())

    console.log(responseBody)

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()
  })

  test('Post Request - Create a new user', async ({ request }) => {
    const response = await request.post(baseURL + '/users', {
      data: {
        name: 'Megaladon 2',
        job: 'SDET leader',
      },
    })

    expect(response.status()).toBe(201)

    const responseBody = JSON.parse(await response.text())

    console.log(responseBody)
    expect(responseBody.name).toBe('Megaladon 2')
  })

  test('Post Request - Login', async ({ request }) => {
    const response = await request.post(baseURL + '/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })

    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())

    //verify the token
    expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4')
  })

  test('Post Request - Login Failed', async ({ request }) => {
    const response = await request.post(baseURL + '/login', {
      data: {
        email: 'eve.holt@reqres.com',
      },
    })

    expect(await response.status()).toBe(400)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)

    expect(responseBody.error).toBe('Missing password')
  })

  test('Put Request - Update User', async ({ request }) => {
    const response = await request.put(baseURL + '/users/2', {
      data: {
        name: 'updated name',
        job: 'new job',
      },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('updated name')
    expect(responseBody.job).toBe('new job')
    expect(responseBody.updatedAt).toBeTruthy()
})

test('Deelte request - Delete an user', async({request})=>{
    const response = await request.delete(`${baseURL}/users/7`)

    expect(response.status()).toBe(204)

    const response2 = await request.get(baseURL+'users/7')

    expect(response2.status()).toBe(404)

})

})

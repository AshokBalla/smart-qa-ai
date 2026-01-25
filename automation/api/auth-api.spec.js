const { test, expect } = require('@playwright/test');

test.describe('Auth API Tests', () => {
  const baseURL = 'https://reqres.in';

  test('POST Login - should return status 200 and token', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    });
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.token).toBeDefined();
  });

  test('POST Login - should return status 400 for missing password', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        email: 'peter@klaven'
      }
    });
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });
});

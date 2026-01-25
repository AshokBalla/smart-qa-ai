const { test, expect } = require('@playwright/test');

test.describe('Users API Tests', () => {
  const baseURL = 'https://reqres.in';

  test('GET Users - should return status 200 and user list', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/users?page=2`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('POST Create User - should return status 201 and created user', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/users`, {
      data: {
        name: 'morpheus',
        job: 'leader'
      }
    });
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('leader');
    expect(body.id).toBeDefined();
  });
});

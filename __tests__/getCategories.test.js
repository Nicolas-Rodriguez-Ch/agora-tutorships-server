const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

afterAll(() => {
  mongoose.disconnect();
});

describe('GET/categories', () => {
  test('responds 200', async () => {
    const response = await request(app).get('/categories');
    expect(response.statusCode).toBe(200);
  });

  test('responds with correct format', async () => {
    const response = await request(app).get('/categories')
    expect(response.body.categories.length).toBeTruthy()
  })

});


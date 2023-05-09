const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

afterAll(() => {
  mongoose.disconnect();
});

describe('Check status', () => {
  test ('Status 200', async () => {
    const response = await request(app)
    .post('/login')
    .send({"email":"user@test.com","password":"12345678"})
    expect(response.statusCode).toBe(200)
  })

  test('Send Token', async () => {
    const response = await request(app)
    .post('/login')
    .send({"email":"user@test.com","password":"12345678"})
    expect(response.text).toBeTruthy()
  })

  test ('Status 404 when data is not an user', async () => {
    const response = await request(app)
    .post('/login')
    .send({"email":"notanuser@test.com","password":"notapassword"})
    expect(response.statusCode).toBe(404)
  })

})
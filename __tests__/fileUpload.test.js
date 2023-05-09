const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

afterAll(() => {
  mongoose.disconnect();
});

describe('File upload tests', () => {
  test('responds with correct cloudinary url', async () => {
    const file = '__tests__/img/homepage_teachertraining_2_desk.jpg';
    const response = await request(app).patch('/uploadProfileImage').attach('image', file);
    expect(response.text).toBeDefined();
    expect(response.text).toMatch(/res.cloudinary.com/);
    expect(response.statusCode).toEqual(200);
  });
});

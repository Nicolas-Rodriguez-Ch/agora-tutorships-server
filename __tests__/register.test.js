const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');

beforeAll(async () => {
  await Tutor.findOneAndDelete({ email: 'test135@example.com' });
  await Student.findOneAndDelete({ email: 'test456@example.com' });
});

afterAll(async () => {
  await Tutor.findOneAndDelete({ email: 'test135@example.com' });
  await Student.findOneAndDelete({ email: 'test456@example.com' });
  mongoose.disconnect();
});

describe('POST / Tutor register', () => {
  const userBody = {
    type: 'tutor',
    inputs: {
      name: 'juan',
      email: 'test135@example.com',
      password: 1236789,
      profession: 'Doctor',
      focus: 'Medicine',
    },
  };
  test('successful Tutor registration responds 201', async () => {
    const response = await request(app).post('/register').send(userBody);
    expect(response.statusCode).toBe(201);
  });
  test('responds 400 if Tutor or Student email exists', async () => {
    const response = await request(app).post('/register').send(userBody);
    expect(response.statusCode).toBe(400);
  });
});

describe('POST / Student register', () => {
  const userBody = {
    type: 'student',
    inputs: {
      name: 'juan',
      email: 'test456@example.com',
      password: 1236789,
    },
  };
  test('successful Student registration responds 201', async () => {
    const response = await request(app).post('/register').send(userBody);
    expect(response.statusCode).toBe(201);
  });
  test('responds 400 if Tutor or Student email exists', async () => {
    const response = await request(app).post('/register').send(userBody);
    expect(response.statusCode).toBe(400);
  });
});

const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
  }]
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany();
  const uniqueEmail = `testuser+${new Date().getTime()}@example.com`;
  userOne.email = uniqueEmail;
  await new User(userOne).save();
});

test('Should register a new user', async () => {
  const response = await request(app)
    .post('/users/register')
    .send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword'
    })
    .expect(201);

  expect(response.body.user).toHaveProperty('_id');
  expect(response.body.user.name).toBe('John Doe');
});

test('Should login an existing user', async () => {
  console.log("Login attempt with:", userOne.email, userOne.password);
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  expect(response.body).toHaveProperty('token');
});

test('Should not login with wrong credentials', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'wrongpassword'
    })
    .expect(400);
});

const request = require('supertest');
const app = require('../app');  // Ensure app is correctly imported from app.js
const User = require('../models/User');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Test User',
  email: `testuser+${new Date().getTime()}@example.com`,  // Ensure unique email for each test run
  password: 'password123',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
  }]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: userOneId
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
  await Task.deleteMany();
  await new User(userOne).save();
  await new Task(taskOne).save();
});

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'New task'
    })
    .expect(201);

  expect(response.body.task).toHaveProperty('_id');
  expect(response.body.task.description).toBe('New task');
});

test('Should fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.tasks.length).toBe(1);
});

test('Should delete user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
});

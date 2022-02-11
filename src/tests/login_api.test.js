/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('login tests',()=>{
  beforeEach(async() => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password',10);
    const user = new User({
      username: 'username1',
      passwordHash: passwordHash
    });
    await user.save();
  });

  test('successful login with correct username and password',async () => {
    const response = await api.post('/api/login/').send({username: 'username1', password: 'password'});
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('username1');
  });

  test('failed login with incorrect username', async () => {
    const response = await api.post('/api/login/').send({username: 'username2', password: 'password'});
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid username or password');
  });

  test('failed login with incorrect password', async () => {
    const response = await api.post('/api/login/').send({username: 'username1', password: 'password2'});
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid username or password');
  });

  test('failed login with empty username and password', async () => {
    const response = await api.post('/api/login/').send({username: '', password: ''});
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid username or password');
  });

});

afterAll(()=>{
  mongoose.connection.close();
});
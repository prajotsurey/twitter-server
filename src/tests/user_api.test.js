/* eslint-disable no-undef */
const User = require('../models/User');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const resetAndLogin = require('./login_helper');

const api = supertest(app);

describe('when one user is added', () => {
  beforeEach(async() => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = await new User({username:'root22', passwordHash: passwordHash});
    await user.save();
  });

  test('user can be created with fresh username',async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'usernameNew',
      password: 'passwordNew'
    };
    
    await api.post('/api/users/')
      .send(newUser)
      .expect(200);

    const updatedUsers = await helper.usersInDb();
    expect(updatedUsers).toHaveLength(usersAtStart.length + 1);

    const updatedUsernames = updatedUsers.map(user => user.username);
    expect(updatedUsernames).toContain(newUser.username);
  });

  test('user cannot be created with repeated username',async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'root22',
      password: 'passwordNew'
    };
    
    const response = await api.post('/api/users/').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('`username` to be unique');

    const updatedUsers = await helper.usersInDb();
    expect(updatedUsers).toHaveLength(usersAtStart.length);
  });
});

describe('creating blogs', () => {
  let authorizationHeader, savedUser;
  beforeEach(async() => {
    const response = await resetAndLogin();
    authorizationHeader = response.authorizationHeader;
    savedUser = response.savedUser;
  });
  test('created blog shows up in users blogs field', async () => {
    const response = await api.post('/api/blogs')
      .set({'authorization': authorizationHeader})
      .send({
        title: 'title new',
        content: 'content new',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('title new');
    const user = await User.findById(savedUser.id).populate('blogs');
    expect(user.blogs[0].id).toContain(response.body.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
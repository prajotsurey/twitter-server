/* eslint-disable no-undef */
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const api = supertest(app);
const helper = require('./test_helper');
const resetAndLogin = require('./login_helper');

describe('blog test', () => {
  let authorizationHeader;
  let savedUser;

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blog1 = new Blog(helper.initialBlogs[0]);
    const blog2 = new Blog(helper.initialBlogs[1]);
    await blog1.save();
    await blog2.save();
    const response = await resetAndLogin();
    authorizationHeader = response.authorizationHeader;
    savedUser = response.savedUser;
  });
  
  test('blogs are returned', async() => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  
  test('blog can be added', async() => {
    const response = await api.post('/api/blogs')
      .set({'authorization': authorizationHeader})
      .send({
        title: 'title new',
        content: 'content new',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('title new');
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toBe(helper.initialBlogs.length + 1);
  });
  
  test('added blog has author field', async() => {
    const response = await api.post('/api/blogs')
      .set({'authorization': authorizationHeader})
      .send({
        title: 'title new',
        content: 'content new',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('title new');
    expect(response.body.author).toEqual(savedUser.id);
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toBe(helper.initialBlogs.length + 1);
  });

  test('blog cannot be added by a logged out user', async() => {
    const response = await api.post('/api/blogs')
      .send({
        title: 'title new',
        content: 'content new',
      });
    expect(response.status).toBe(401);
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toBe(helper.initialBlogs.length);
  });

  test('blog with missing title cannot be added', async() => {
    const response = await api.post('/api/blogs').send({
      title: '',
      content: 'content new',
    });
    expect(response.status).toBe(400);
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toBe(helper.initialBlogs.length);
  });
  
  test('blog can be deleted', async() => {
    const blogs = await helper.blogsInDb();
    const response = await api.delete(`/api/blogs/${blogs[0].id}`);
    expect(response.status).toBe(204);
    const updatedBlogs = helper.blogsInDb();
    expect(await updatedBlogs).toHaveLength(blogs.length - 1);
  });
  
  test('Non existing blog cannot be deleted', async() => {
    const blogs = await helper.blogsInDb();
    const nonExistingId = await helper.nonExistingId();
    const response = await api.delete(`/api/blogs/${nonExistingId}`);
    expect(response.status).toBe(404);
    const updatedBlogs = helper.blogsInDb();
    expect(await updatedBlogs).toHaveLength(blogs.length);
  });
  
  test('blog detail is returned', async() => {
    const blogs = await helper.blogsInDb();
    const response = await api.get(`/api/blogs/${blogs[0].id}`);
    expect(response.body.title).toBe(blogs[0].title);
  });
  
  test('non existing blog detail is not returned', async() => {
    const nonExistingId = await helper.nonExistingId();
    const response = await api.get(`/api/blogs/${nonExistingId}`);
    expect(response.status).toBe(404);
  });
  
  afterAll(()=> {
    mongoose.connection.close();
  });
});
const request = require("supertest");
const app = require("../../src/app");
const {mockLessonRequest, mockLessonsResponse} = require('../mockData');
const {databaseConnector} = require('../../src/providers/databaseConnector');


describe('Integration - Lessons Test Suite', () => {
  it('GET /api/lesson should succeed', async () => {
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: mockLessonsResponse}));
    const response = await request(app).get('/api/lesson');
    expect(response.statusCode).toBe(200);
    expect(response.body?.[0]?.lesson_id).toBeDefined();
    expect(response.body).toEqual(mockLessonsResponse);
  });

  it('GET /api/lesson should return error if getAllLessons fails', async () => {
    const errorMessage = 'failed to connect to db';
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.reject(new Error(errorMessage)));
    const response = await request(app).get('/api/lesson');
    expect(response.statusCode).toBe(500);
    expect(response._body.message).toBe(errorMessage);
  });

  it('POST /api/lesson should succeed', async () => {
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: [mockLessonsResponse[0]]}));
    const response = await request(app).post('/api/lesson').send(mockLessonRequest);
    expect(response.statusCode).toBe(201);
    expect(response.body?.lesson_id).toBeDefined();
    expect(response.body).toEqual(mockLessonsResponse[0]);
  });

  it('PATCH /api/lesson should succeed', async () => {
    const updatedLessonResponse = {...mockLessonsResponse[0], lesson_name: 'New Lesson'}
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: [updatedLessonResponse]}));
    const response = await request(app).patch(`/api/lesson/1`).send({lessonName: 'New Lesson'});
    expect(response.statusCode).toBe(200);
    expect(response.body?.lesson_id).toBeDefined();
    expect(response.body).toEqual(updatedLessonResponse);
  });

  it('DELETE /api/lesson should succeed', async () => {
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: [[0]]}));
    const response = await request(app).delete(`/api/lesson/1`);
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeDefined();
  });
});
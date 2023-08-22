const {databaseConnector} = require('../../src/providers/databaseConnector');
const {createLessonProvider, getAllLessonsProvider} = require('../../src/providers/lessons');
const {mockLessonsResponse} = require('../mockData');

describe('Providers - Lessons Test Suite', () => {
  it('getAllLessonsProvider should succeed', async () => {
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: mockLessonsResponse}));
    const response = await getAllLessonsProvider();
    expect(response.rows).toBeDefined();
    expect(response.rows).toEqual(mockLessonsResponse);
  });

  it('createLessonProvider should succeed', async () => {
    jest.spyOn(databaseConnector, 'query').mockImplementation(() => Promise.resolve({rows: mockLessonsResponse[0]}));
    const response = await createLessonProvider('lesson_name, course_id, language_code, lesson_text, lesson_id', `'English lesson', 2, 'en', 'This is my first english lesson'`);
    expect(response.rows).toBeDefined();
    expect(response.rows).toEqual(mockLessonsResponse[0]);
  });
});
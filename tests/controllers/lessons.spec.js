const { Courses } = require('../../src/constants');
const {insertLesson, updateLesson, getAllLessons, getLessonsByField} = require('../../src/controllers/lessons');
const {createLessonProvider, updateLessonProvider, getAllLessonsProvider, getLessonsByFieldProvider} = require('../../src/providers/lessons');
const {mockLessonRequest, mockLessonsResponse} = require('../mockData');


jest.mock('../../src/providers/lessons');

describe('Controllers - Lessons Test Suite', () => {
  it('getAllLessons should succeed', async () => {
    getAllLessonsProvider.mockImplementation(() => Promise.resolve({rows: mockLessonsResponse}));
    const response = await getAllLessons();
    expect(response.rows?.[0]).toBeDefined();
    expect(response.rows).toEqual(mockLessonsResponse);
  });

  it('getLessonsByField should succeed', async () => {
    getLessonsByFieldProvider.mockImplementation(() => Promise.resolve({rows: mockLessonsResponse.filter(lesson => lesson.course_id === 2)}));
    const response = await getLessonsByField(2, Courses.COURSE_ID);
    expect(response.rows?.[0]).toBeDefined();
    expect(response.rows).toEqual(mockLessonsResponse.filter(lesson => lesson.course_id === 2));
  });

  it('insertLesson should succeed', async () => {
    createLessonProvider.mockImplementation(() => Promise.resolve(mockLessonsResponse[0]));
    const response = await insertLesson(mockLessonRequest);
    expect(response).toBeDefined();
    expect(response).toEqual(mockLessonsResponse[0]);
  });

  it('updateLesson should succeed', async () => {
    const newLesson = {...mockLessonsResponse[0], lesson_name: 'New Lesson'}
    updateLessonProvider.mockImplementation(() => Promise.resolve(newLesson));
    const response = await updateLesson({lessonName: 'New Lesson'},1);
    expect(response).toBeDefined();
    expect(response).toEqual(newLesson);
  });
});
const {
  camelToSnakeCase,
  createCommaSeperatedKeyValueString, 
  createCommaSeperatedString, 
  removeUndefinedProperties
} = require('../src/utils');

const {Lessons, Courses} = require('../src/constants');

describe('Utils Test Suite', () => {
  it('camelToSnakeCase should work correctly', () => {
    const input1 = 'variable', output1 = 'variable';
    const input2 = 'biggerVariable', output2 = 'bigger_variable';
    const input3 = 'evenBiggerVariable', output3 = 'even_bigger_variable';
    expect(camelToSnakeCase(input1)).toBe(output1);
    expect(camelToSnakeCase(input2)).toBe(output2);
    expect(camelToSnakeCase(input3)).toBe(output3);
  });

  it('removeUndefinedProperties should work correctly', () => {
    const input = {lessonName: 'lesson1', languageCode: undefined, courseId: null};
    const output = {lessonName: 'lesson1', courseId: null};
    removeUndefinedProperties(input);
    expect(input).toEqual(output);
  });

  it('createCommaSeperatedString should work correctly', () => {
    const input1 = [Lessons.LESSON_NAME, Courses.COURSE_ID], output1 = `lesson_name, course_id`;
    const input2 = ['Lesson 1', 2], output2 = `'Lesson 1', 2`;
    expect(createCommaSeperatedString(input1)).toBe(output1);
    expect(createCommaSeperatedString(input2, true)).toBe(output2);
  });

  it('createCommaSeperatedKeyValueString should work correctly', () => {
    const input1 = {course_id: 2, language_code: null}, output1 = `course_id=2, language_code=null`;
    const input2 = {course_id: 2, lesson_name: 'Lesson 1'}, output2 = `course_id=2, lesson_name='Lesson 1'`;
    expect(createCommaSeperatedKeyValueString(input1)).toBe(output1);
    expect(createCommaSeperatedKeyValueString(input2, true)).toBe(output2);
  });
});

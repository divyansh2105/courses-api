const mockLessonsResponse = [{
  lesson_id: 1,
  lesson_name: 'English lesson',
  course_id: 2,
  language_code: 'en',
  lesson_text: 'This is my first english lesson'
},
{
  lesson_id: 2,
  lesson_name: 'German lesson',
  course_id: 1,
  language_code: 'de',
  lesson_text: 'This is my first german lesson'
}];

const mockLessonRequest = {
  lessonName: 'English lesson',
  courseId: 2,
  languageCode: 'en',
  lessonText: 'This is my first english lesson'
}

module.exports = {mockLessonsResponse, mockLessonRequest};
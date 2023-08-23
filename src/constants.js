const Lessons = {
  LESSON_ID: 'lesson_id',
  LESSON_NAME: 'lesson_name',
  LESSON_TEXT: 'lesson_text',
  ACTIVE_LESSON_ID: 'active_lesson_id'
};

const Courses = {
  COURSE_ID: 'course_id',
  COURSE_NAME: 'course_name'
}

const Languages = {
  LANGUAGE_CODE: 'language_code',
  LANGUAGE_NAME: 'language_name'
}

const Users = {
  USERNAME: 'username',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  PASSWORD: 'password',
  PROFILE_PIC: 'profile_pic',
  REFRESH_TOKEN: 'refresh_token'
}

const ErrorMessages = {
  MISSING_FIELDS: 'Missing fields in request',
  USER_NOT_EXIST: `User doesn't exist`
}

module.exports = {Lessons, Courses, Languages, Users, ErrorMessages}

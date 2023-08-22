# courses-api
## Steps to set up dev environment
Ensure you have Node.js, Git and PostgreSQL installed. Also ensure you have created all the SQL tables by running the queries mentioned in `databaseQueries.txt`

- Clone the repo using `git clone git@github.com:divyansh2105/courses-api.git`.
- cd to the root directory
- Run `npm install` which would install all dependencies.

- Rename the file `.envCopy` to `.env` and assign all the parameters, some sample values which would work:
  - `ACCESS_TOKEN_SECRET` = e9b879782286aa89e845fa7b7ba5df00111659526eec98d335158f957f17006fab1116f099a2b9e0e8c56bee8f7a7aa62ba25d837061286a3b04de74b014c65c
  - `REFRESH_TOKEN_SECRET` = 7462df7e0c33cef3309666bd2a0ed50b478a892a46d38dd4148842f24e07959be8012318701ff112ca48e4fd1c14cf5ebe99529a474a633e83ed18aec202bada
  - `POSTGRESQL_DIR` = /usr/local/var/postgres

- Run `npm run start` which would start the PostgreSQL server and the Backend server.


## API endpoints (Postman file included in project `postman.json` which can be imported)
### Auth (start with `http://localhost:3000/auth`)
Auth is being implemented through JWT tokens.
Currently Auth is only enabled for the endpoints for Updating and Deleting a Course, as mentioned in the requirements. But it can be easily be extended for any endpoint by adding the `authenticateToken` middleware.
- Login (`/login`) | POST - A registered user can login through this endpoint. It returns an access token and a refresh token(which is stored in the db). Access token needs to be passed in the header of all the requests for endpoints which have auth enabled.
  - Request body { username, password }
  - Response body { accessToken, refreshToken }
- Token (`/token`) | POST - The access token expires in 15 minutes after which a new access token needs to be created. This endpoint takes in the user's active refresh token and returns a new access token.
  - Request body {token} //refresh token
  - Response body { accessToken }
- Logout (`/logout`) | POST - This endpoint logs the user out by deleting the refresh token from the db. Once the access token expires, user would need to Login again to generate a new access token.
  - Request header - Authorization: `Bearer <access_token>`

### Users (start with `http://localhost:3000/api/user`)
- Register user (`/`)| POST
  - Request body of type form-data {profilePic //upload a picture, username, firstName, lastName, password}
  - Response body {username, first_name, last_name, profilePic}
- Get By Id (`/:username`) | GET
- Update (`/:username`) | PATCH
  - Request body of type form-data {//any number of properties you want to update}
  - Response body {//updated user}
- Delete (`/:username`) | DELETE
- Replace profile pic (`/replace-pic/:username`) | PATCH
  - Request body of type form-data {profilePic //upload the picture}
  - Response body {//updated user}
 
### Courses (start with `http://localhost:3000/api/course`)
- Create course (`/`)| POST
  - Request body {username, courseName, activeLessonId}
  - Response body {course_id, course_name, username, active_lesson_id}
- Get By Username (`/:username`) | GET
  - Response body {course_id, course_name, username, active_lesson_id, leesons //a nested array of all lessons within this course ordered by lesson_id}
- Get All (`/`) | GET
  - Response body [{course_id, course_name, username, active_lesson_id, leesons //a nested array of all lessons within this course ordered by lesson_id}]
- Update (`/:courseId`) | PATCH
  - Request body {//any number of properties you want to update} | header - Authorization: `Bearer <access_token>`
  - Response body {//updated course}
- Delete (`/:courseId`) | DELETE
   - Request header - Authorization: `Bearer <access_token>`
 
### Lessons (start with `http://localhost:3000/api/lesson`)
- Create lesson (`/`)| POST
  - Request body {lessonName, courseId, languageCode, lessonText}
  - Response body {lesson_id, lesson_name, course_id, language_code, lesson_text}
- Get All (`/`) | GET
  - Response body [{lesson_id, lesson_name, course_id, language_code, lesson_text}] 
- Update (`/:lessonId`) | PATCH
  - Request body {//any number of properties you want to update}
  - Response body {//updated lesson}
- Delete (`/:lessonId`) | DELETE

### Languages (start with `http://localhost:3000/api/language`)
- Create language (`/`)| POST
  - Request body {languageName, languageCode //2 letter code}
  - Response body {language_name, language_code}
- Get All (`/`) | GET
  - Response body [{language_name, language_code}] 
- Update (`/:languageCode`) | PATCH
  - Request body {//any number of properties you want to update}
  - Response body {//updated language}
- Update (`/:languageCode`) | PUT
  - Request body {language_name, language_code}
  - Response body {//updated language}
- Delete (`/:languageCode`) | DELETE
- Delete ALL (`/`) | DELETE

## Schema for tables
Refer to `databaseQueries.txt` in the root directory of the project.

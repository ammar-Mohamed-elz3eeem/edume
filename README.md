# EduMe API

## Table of Contents
- [Introduction](#Introduction)
- [Installition](#Installition)
- [Endpoints](#Endpoints)

## Introduction
Edume is Learning mangement System which is used to make e-learning easier

## Installition
To install this project first you need to clone this project into your pc using
```
git clone <REPO_URL>
```
after cloning go to the project directory by running
```
cd edume
```
Then run installtion command to install all the required packages that the application needs to run
```
npm install
```

## Endpoints

- /auth
  - GET / get current logged in user (this request requires credentials from frontend)
  - POST /logout remove current logged in user session from server (this request requires credentials from frontend)
  - POST /login log user in with username, password -> payload { username, password } (this request requires credentials from frontend)
  - POST /register add new user to website -> payload {
      username,
      password,
      firstName,
      lastName,
      email,
      confirm_password,
      dob,
      role: 'Teacher' | 'student',
    }

- /users
  - GET / get all users
  - GET /:id get single user using it's id
  - GET /:id/enrollments get all the courses that user has enrolled in
  - GET /:id/feedbacks get all feedbacks user has given to courses
  - GET /:id/forums get all forums that user has wrote
  - GET /:id/notifications get all notifications for this user
  - GET /:id/actvities get all activities user have done (login, course_enrollment, course_completed, quiz_completed)
  - PUT /:id edit user information (this request requires credentials from frontend)
  - DELETE /:id delete user whose id = :id from the database (this request requires credentials from frontend)

- /courses
  - GET / get all courses
  - GET /:id get single course using course ID
  - GET /:id/lessons get course lessons
  - GET /:id/quizzies get course quizzies
  - GET /:id/enrollments get course enrollments
  - GET /:id/feedbacks get course reviews
  - GET /:id/groups get course groups
  - GET /:id/resources get course resources

  - POST / (this request requires credentials from frontend) add new course to website -> payload (
      title // <input type="text" name="title" />,
      description // <input type="text" name="description" />,
      featuredImage // <input type="file" name="featuredImage" />
      lessons?: [
        {
          title,
          content,
          attachments: {
            attachments[lessonIDX][]
          }
        }
      ],
      quizzes?: [
        {
          title
        }
      ],
      resources?: [
        {
          name,
          type: 'video' || 'article' || 'pdf',
          url
        }
      ],
      tags?: [
        {
          name
        }
      ]
    )
  - PUT /:id (this request requires credentials from frontend) edit information for course which id =:id -> payload { title, description, featuredImage }
  - DELETE /:id (this request requires credentials from frontend) delete course which id =:id

- /feedbacks
  - GET / get all feedbacks
  - GET /:id get feedback which id = :id
  - POST / (this request requires credentials from frontend) add new feedback -> payload {userId, courseId, comment, rating}
  - PUT (this request requires credentials from frontend) /:id edit feedback which id = :id -> payload {comment, rating}
  - DELETE (this request requires credentials from frontend) /:id delete feedback which id = :id

- /answers
  - GET / get all answers
  - GET /:id get answer which id = :id
  - POST (this request requires credentials from frontend) / add new answer -> payload {content, isCorrect, questionId}
  - PUT (this request requires credentials from frontend) /:id edit answer which id = :id -> payload {content, isCorrect}
  - DELETE (this request requires credentials from frontend) /:id delete answer which id = :id

- /forums
  - GET / get all forums
  - GET /:id get forum which id = :id
  - POST (this request requires credentials from frontend) / add new forum -> payload { userId, content }
  - PUT (this request requires credentials from frontend) /:id edit forum which id = :id -> payload { content }
  - DELETE (this request requires credentials from frontend) /:id delete forum which id = :id

- /groups
  - GET / get all groups
  - GET /:id get group which id = :id
  - POST (this request requires credentials from frontend) / add new group -> payload { createdBy, name, courseId  }
  - PUT (this request requires credentials from frontend) /:id edit group which id = :id -> payload { name }
  - DELETE (this request requires credentials from frontend) /:id delete group which id = :id

- /questions
  - GET / get all questions
  - GET /:id get question which id = :id
  - POST (this request requires credentials from frontend) / add new question -> payload { content, quizID }
  - PUT (this request requires credentials from frontend) /:id edit question which id = :id -> payload { content }
  - DELETE (this request requires credentials from frontend) /:id delete question which id = :id

- /quizzies
  - GET / get all quizzies
  - GET /:id get quiz which id = :id
  - POST (this request requires credentials from frontend) / add new quiz -> payload { title, courseId }
  - PUT (this request requires credentials from frontend) /:id edit quiz which id = :id -> payload { title }
  - DELETE (this request requires credentials from frontend) /:id delete quiz which id = :id

- /course-progress
  - GET / get all course progresses
  - GET (this request requires credentials from frontend) /course/:courseId/lesson/:lessonId/user/:userId get course progress by which courseId=:courseId && lessonId=:lessonId && userId=:userId
  - POST (this request requires credentials from frontend) / add new course progress -> payload {
      userId,
      courseId,
      lessonId,
      completed,
      progressPercentage,
      lastAccessedAt,
    }
  - PUT (this request requires credentials from frontend) /course/:courseId/lesson/:lessonId/user/:userId edit course progress which courseId=:courseId && lessonId=:lessonId && userId=:userId -> payload {
    completed,
    progressPercentage,
    lastAccessedAt
  }
  - DELETE (this request requires credentials from frontend) course/:courseId delete course progress which courseId = :courseId

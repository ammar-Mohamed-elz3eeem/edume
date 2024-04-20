"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.courses = void 0;
exports.courses = [
    {
        title: 'Course #1',
        description: 'Test course #1 Description',
        createdBy: 1,
        lessons: [{ title: 'Lesson #1', content: 'Dummy Lesson 1' }],
        courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
        quizzies: [{ title: 'Chapter #1 Quiz' }, { title: 'Chapter #2 Quiz' }],
    },
    {
        title: 'Course #2',
        description: 'Test course #2 Description',
        createdBy: 1,
        courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
        quizzies: [{ title: 'Chapter #1 Quiz' }, { title: 'Chapter #2 Quiz' }],
    },
    {
        title: 'Course #3',
        description: 'Test course #3 Description',
        createdBy: 1,
        lessons: [{ title: 'Lesson #1', content: 'Dummy Lesson 1' }],
        quizzies: [{ title: 'Chapter #1 Quiz' }, { title: 'Chapter #2 Quiz' }],
    },
    {
        title: 'Course #4',
        description: 'Test course #4 Description',
        createdBy: 2,
        courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
    },
    {
        title: 'Course #5',
        description: 'Test course #5 Description',
        createdBy: 2,
        quizzies: [{ title: 'Chapter #1 Quiz' }, { title: 'Chapter #2 Quiz' }],
    },
    {
        title: 'Course #6',
        description: 'Test course #6 Description',
        createdBy: 3,
        lessons: [{ title: 'Lesson #1', content: 'Dummy Lesson 1' }],
        courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
    },
];
exports.users = [
    {
        username: 'testuser1',
        password: '123',
        firstName: 'test1',
        lastName: 'user1',
        email: 'test@user1.com',
        confirm_password: '123',
        dob: '11-28-1998',
        role: 'admin',
    },
    {
        username: 'testuser2',
        password: '123',
        firstName: 'test2',
        lastName: 'user2',
        email: 'test@user2.com',
        confirm_password: '123',
        dob: '11-28-1998',
        role: 'teacher',
    },
    {
        username: 'testuser3',
        password: '123',
        firstName: 'test3',
        lastName: 'user3',
        email: 'test@user3.com',
        confirm_password: '123',
        dob: '11-28-1998',
        role: 'student',
    },
];

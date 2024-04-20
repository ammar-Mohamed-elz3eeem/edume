"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("../../db"));
const index_1 = require("../../models/index");
const index_2 = require("../../models/index");
const index_3 = require("../../models/index");
const index_4 = require("../../models/index");
describe('Test Tags Model', () => {
    let user;
    let course;
    let tags;
    let courseTags;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
    });
    it('Test add new Tag', async () => {
        user = await index_3.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
        course = await index_2.Course.create({
            title: 'Test Course #1',
            description: 'Test Course #1 Description',
            createdBy: user.dataValues.id,
        });
        tags = await index_1.Tag.bulkCreate([
            { name: 'programming' },
            { name: 'c++' },
            { name: 'javascript' },
        ]);
        expect(tags.length).toBe(3);
    });
    it('add new courseTags with invalid tag', async () => {
        const invalidTag = index_4.CourseTag.bulkCreate([
            { CourseId: course?.dataValues.id, TagId: 9999999999 },
            { CourseId: course?.dataValues.id, TagId: tags[1].dataValues.id },
            { CourseId: course?.dataValues.id, TagId: tags[2].dataValues.id },
        ]);
        expect(invalidTag).rejects.toThrow(Error);
    });
    it('add new courseTags', async () => {
        courseTags = await index_4.CourseTag.bulkCreate([
            { CourseId: course?.dataValues.id, TagId: tags[0].dataValues.id },
            { CourseId: course?.dataValues.id, TagId: tags[1].dataValues.id },
            { CourseId: course?.dataValues.id, TagId: tags[2].dataValues.id },
        ]);
        expect(courseTags.length).toBe(3);
    });
    it('course tags exists', async () => {
        const courseWithTags = await index_2.Course.findByPk(course?.dataValues.id, {
            include: [{ model: index_1.Tag, as: 'courseTags' }],
        });
        expect(courseWithTags?.dataValues.courseTags.length).toBe(3);
    });
    it('update single tag will reflect on courses', async () => {
        const updatedTag = await index_1.Tag.update({ name: 'essentials' }, { where: { id: tags[1].dataValues.id } });
        expect(updatedTag[0]).toBe(1);
        const courseWithTags = await index_2.Course.findByPk(course?.dataValues.id, {
            include: [{ model: index_1.Tag, as: 'courseTags' }],
        });
        expect(courseWithTags?.dataValues.courseTags[2].dataValues.name).toBe('essentials');
    });
    it('delete tags will not throw an error', async () => {
        await index_1.Tag.destroy({
            where: { id: tags[0].dataValues.id },
        });
        const courseWithTags = await index_2.Course.findByPk(course?.dataValues.id, {
            include: [{ model: index_1.Tag, as: 'courseTags' }],
        });
        expect(courseWithTags?.dataValues.courseTags.length).toBe(2);
    });
    it('delete courseTag and course will have only 1 tag', async () => {
        await index_4.CourseTag.destroy({
            where: { id: courseTags[1].dataValues.id },
        });
        const courseWithTags = await index_2.Course.findByPk(course?.dataValues.id, {
            include: [{ model: index_1.Tag, as: 'courseTags' }],
        });
        expect(courseWithTags?.dataValues.courseTags.length).toBe(1);
        const tags = await index_1.Tag.findAll();
        expect(tags.length).toBe(2);
    });
});

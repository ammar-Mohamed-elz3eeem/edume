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
describe('Test User Mode', () => {
    let user;
    let course;
    let group;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
        user = await index_1.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
        course = await index_3.Course.create({
            title: '#3 Course',
            description: 'COOOOOOOOOOOOntent',
            createdBy: user.dataValues.id,
        });
    });
    it("can't create group with no createdBy", async () => {
        const failed = index_2.Group.create({
            name: 'No Content',
            courseId: course.dataValues.id,
        });
        expect(failed).rejects.toThrow(Error);
    });
    it("can't create group with no courseId", async () => {
        const failed = index_2.Group.create({
            name: 'No Content',
            createdBy: user.dataValues.id,
        });
        expect(failed).rejects.toThrow(Error);
    });
    it("can't create group with invalid courseId", async () => {
        const failed = index_2.Group.create({
            name: 'No Content',
            createdBy: user.dataValues.id,
            courseId: 99999999999,
        });
        expect(failed).rejects.toThrow(Error);
    });
    it("can't create group with invalid createdBy", async () => {
        const failed = index_2.Group.create({
            name: 'No Content',
            createdBy: 99999999999,
            courseId: course.dataValues.id,
        });
        expect(failed).rejects.toThrow(Error);
    });
    it('create group', async () => {
        group = await index_2.Group.create({
            name: 'No Content',
            createdBy: user.dataValues.id,
            courseId: course.dataValues.id,
        });
        expect(group.dataValues.id).toBeGreaterThan(0);
    });
    it('edit group', async () => {
        const updated = await index_2.Group.update({
            name: 'New Content :)',
        }, { where: { id: group.dataValues.id } });
        expect(updated[0]).toBeGreaterThan(0);
    });
    it('get Group from course', async () => {
        const courseWithgroup = await index_3.Course.findAll({
            include: [{ model: index_2.Group, as: 'course_groups' }],
        });
        expect(courseWithgroup[0].dataValues.course_groups.length).toBeGreaterThan(0);
    });
    it('delete group', async () => {
        const deleted = await index_2.Group.destroy({ where: { id: group.dataValues.id } });
        expect(deleted).toBeGreaterThan(0);
    });
});

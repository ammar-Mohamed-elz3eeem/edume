import { config } from 'dotenv';
config();
import User from '@/models/User.model';
import sequelize from '@/db';
import { Model } from 'sequelize';
import { ForumGroup } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model;
  let forum: Model;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    user = await User.create({
      firstName: 'ammar',
      lastName: 'Massoud',
      username: 'ammar-koa',
      email: 'ammar@gmail.com',
      password: '158269347',
    });
  });

  it("no user id can't add Forum", async () => {
    const invalidForum = ForumGroup.create({
      content: 'This is #1 Forum',
    });

    expect(invalidForum).rejects.toThrow(Error);
  });

  it("invalid user id can't add Forum", async () => {
    const invalidForum = ForumGroup.create({
      content: 'This is #1 Forum',
      userId: 999999999999,
    });

    expect(invalidForum).rejects.toThrow(Error);
  });

  it('add new Forum', async () => {
    forum = await ForumGroup.create({
      content: 'This is #1 Forum',
      userId: user.dataValues.id,
    });

    expect(forum.dataValues.id).toBeGreaterThan(0);
  });

  it('edit Forum', async () => {
    const editedForum = await ForumGroup.update(
      {
        content: '#1 Content edited',
      },
      { where: { id: forum.dataValues.id } },
    );

    expect(editedForum[0]).toBeGreaterThan(0);
  });

  it('get all forums', async () => {
    const forums = await ForumGroup.findAll();

    expect(forums.length).toBeGreaterThan(0);
  });

  it('delete new Forum', async () => {
    const deletedForum = await ForumGroup.destroy({
      where: { id: user.dataValues.id },
    });

    expect(deletedForum).toBeGreaterThan(0);
  });
});

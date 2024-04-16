import { Model } from 'sequelize';
import { config } from 'dotenv';
config();

import sequelize from '@/db';
import { User } from '@/models/index';
import { Notification } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model;
  let notification: Model;

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

  it("can't create notification with no userId", async () => {
    const failed = Notification.create({
      message: 'you enrolled in course #1',
    });

    expect(failed).rejects.toThrow(Error);
  });

  it("can't create notification with invalid userId", async () => {
    const failed = Notification.create({
      message: 'you enrolled in course #1',
      userId: 99999999999,
    });

    expect(failed).rejects.toThrow(Error);
  });

  it('create notification', async () => {
    notification = await Notification.create({
      message: 'you enrolled in course #1',
      userId: user.dataValues.id,
    });

    expect(notification.dataValues.id).toBeGreaterThan(0);
  });

  it('update notification', async () => {
    const updated = await Notification.update(
      {
        message: 'you have completed course successfully',
      },
      { where: { id: notification.dataValues.id } },
    );

    expect(updated[0]).toBeGreaterThan(0);
  });

  it('get Notifications from user', async () => {
    const userWithNotifications = await User.findAll({
      include: [{ model: Notification, as: 'notifications' }],
    });
    expect(
      userWithNotifications[0].dataValues.notifications.length,
    ).toBeGreaterThan(0);
  });

  it('delete notification', async () => {
    const deleted = await Notification.destroy({
      where: { id: notification.dataValues.id },
    });

    expect(deleted).toBeGreaterThan(0);
  });
});

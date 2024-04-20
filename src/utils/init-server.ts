import sequelize from '@/db';
import Koa from 'koa';
const port = process.env.PORT || 5050;
export default async function initServer(app: Koa) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`🚀 Server is running on port http://localhost:${port}/`);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

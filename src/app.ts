import { config } from 'dotenv';
config();
import Koa, { Context } from 'koa';
import cors from '@koa/cors';

const app = new Koa();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use((ctx: Context) => {
  ctx.body = 'Hello From edume';
});

app.listen(9000, () => {
  console.log('listening to server on port 9000');
});

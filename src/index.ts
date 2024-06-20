import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { DbConnect } from './db';

import brandsApi from './routes/brands';
import flippersApi from './routes/flippers';

const app = new Hono();
await DbConnect();

const port = 3000;
console.log(`Server is running on port ${port}`);




app.route('/api/brands', brandsApi);
app.route('/api/flippers', flippersApi);


app.use('*', (c) => {
  return c.json({ msg: '404 oups' }, 404);
});

serve({
  fetch: app.fetch,
  port,
});

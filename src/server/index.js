import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import logger from 'koa-morgan';

import indexRoutes from './routes/index';
import movieRoutes from './routes/movies';
import genreRoutes from './routes/genres';

const app = new Koa();
const PORT = 1337;

app.use(logger('tiny'));
app.use(bodyParser());
app.use(serve(`${__dirname}/public`));
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());
app.use(genreRoutes.routes());

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

export default server;

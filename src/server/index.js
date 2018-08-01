const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-morgan');

const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');

const app = new Koa();
const PORT = 1337;

app.use(logger('tiny'));
app.use(bodyParser());
app.use(serve(`${__dirname}/public`));
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;

const Router = require('koa-router');
const queries = require('../db/queries/genres');

const BASE_URL = `/api/v1/genres`;

const router = new Router({ prefix: BASE_URL });

router.get('/', async ctx => {
  try {
    const genres = await queries.getAllGenres();

    if (genres && genres.length) {
      ctx.body = {
        status: 'success',
        data: genres
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occured'
    };
  }
});

router.get('/:id/movies', async ctx => {
  const { page, perPage } = ctx.query;
  try {
    const { data, pagination } = await queries.getGenreMovies(
      ctx.params.id,
      page,
      perPage
    );

    console.log(data);

    if (data && data.length && pagination) {
      ctx.body = {
        status: 'success',
        data,
        pagination
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: "Moves of that genre don't exist"
      };
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

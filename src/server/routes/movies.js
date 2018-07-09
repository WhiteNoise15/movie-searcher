const Router = require('koa-router');
const queries = require('../db/queries/movies');

const BASE_URL = `/api/v1/movies`;
const router = new Router({ prefix: BASE_URL });

router.get('/', async ctx => {
  try {
    const movies = await queries.getAllMovies();
    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`/:id`, async ctx => {
  try {
    const movie = await queries.getSingleMovie(ctx.params.id);
    if (movie.length) {
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist'
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(`/`, async ctx => {
  try {
    const movie = await queries.addMovie(ctx.request.body);
    if (movie.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
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

router.put(`/:id`, async ctx => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
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

router.put(`/:id`, async ctx => {
  try {
    const movie = await queries.deleteMovie(ctx.params.id);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
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

router.get(`/:id/actors`, async ctx => {
  try {
    const actors = await queries.getMovieActors(ctx.params.id);
    if (actors.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: actors
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'There are no actors in this movie.'
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

router.get(`/:id/genres`, async ctx => {
  try {
    const genres = await queries.getMovieGenres(ctx.params.id);
    if (genres.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: genres
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Movie does not have any genre'
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

module.exports = router;

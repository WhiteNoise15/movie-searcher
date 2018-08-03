const knex = require('../connection');
const { paginator } = require('../../utils/knexUtils');

function getAllMovies(page, perPage) {
  const query = knex('movies').select('*');
  return paginator(knex)(query, page, perPage);
}

function getSingleMovie(id) {
  return knex('movies')
    .innerJoin('movie_genres', 'movies.id', 'movie_genres.movie_id')
    .innerJoin('genres', 'movie_genres.genre_id', 'genres.id')
    .where({ 'movies.id': parseInt(id, 10) })
    .select(['movies.*', knex.raw('json_agg(genres.*) as genres')])
    .groupBy('movies.id', 'movies.name');
}

function addMovie(movie) {
  return knex('movies')
    .insert(movie)
    .returning('*');
}

function updateMovie(id, movie) {
  return knex('movies')
    .update(movie)
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

function deleteMovie(id) {
  return knex('movies')
    .del()
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

function getMovieActors(id) {
  return knex('movie_makers')
    .join('filmmakers', 'movie_makers.filmmaker_id', 'filmmakers.id')
    .join('movie_roles', 'movie_makers.role_id', 'movie_roles.id')
    .where('movie_makers.movie_id', id)
    .andWhere('movie_roles.role', 'Actor')
    .select(['filmmakers.name', 'filmmakers.sex', 'filmmakers.age']);
}

function getMovieStaff(id) {
  knex('movie_makers')
    .join('filmmakers', 'movie_makers.filmmaker_id', 'filmmakers.id')
    .join('movie_roles', 'movie_makers.role_id', 'movie_roles.id')
    .where('movie_makers.movie_id', id)
    .andWhereNot('movie_roles.role', 'Actor')
    .select(['filmmakers.name', 'filmmakers.sex', 'filmmakers.age']);
}

function getMovieGenres(id) {
  return knex('movie_genres')
    .join('genres', 'movie_genres.genre_id', 'genres.id')
    .select('genres.name')
    .where('movie_genres.movie_id', id);
}

function getMovieReviews(id) {
  return knex('movies')
    .join('movie_reviews', 'movie_reviews.movie_id', 'movies.id')
    .select('movie_reviews.*')
    .where('movie_reviews.movie_id', id);
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieActors,
  getMovieGenres,
  getMovieStaff,
  getMovieReviews
};

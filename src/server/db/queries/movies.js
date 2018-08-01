const knex = require('../connection');

function getAllMovies() {
  return knex('movies').select('*');
}

function getSingleMovie(id) {
  return knex('movies')
    .innerJoin('movies_genres', 'movies.id', 'movies_genres.movie_id')
    .innerJoin('genres', 'movies_genres.genre_id', 'genres.id')
    .where({ 'movies.id': parseInt(id, 10) })
    .select([
      'movies.id',
      'movies.name as movieName',
      knex.raw('json_agg(genres.*) as genres')
    ])
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
  return knex('movies_genres')
    .join('genres', 'movies_genres.genre_id', 'genres.id')
    .select('genres.name')
    .where('movies_genres.movie_id', id);
}

function getMovieReviews(id) {
  return knex('movies')
    .join('movie_reviews', 'movie_reviews', 'movies.id')
    .select('movie_reviews.review')
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

const knex = require('../connection');

function getAllMovies() {
  return knex('movies').select('*');
}

function getSingleMovie(id) {
  return knex('movies')
    .select(['genres.name', 'movies.id', 'movies.name as movieName'])
    .join('movies_genres', 'movies.id', 'movies_genres.movie_id')
    .join('genres', 'movies_genres.genre_id', 'genres.id')
    .where({ 'movies.id': parseInt(id, 10) });
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
    .join('actors', 'movie_makers.actor_id', 'actors.id')
    .join('movie_roles', 'movie_makers.role_id', 'movie_roles.id')
    .where('movie_makers.movie_id', id)
    .andWhere('movie_roles.role', 'Actor')
    .select(['actors.name', 'actors.sex', 'actors.age']);
}

function getMovieStaff(id) {
  knex('movie_makers')
    .join('actors', 'movie_makers.actor_id', 'actors.id')
    .join('movie_roles', 'movie_makers.role_id', 'movie_roles.id')
    .where('movie_makers.movie_id', id)
    .andWhereNot('movie_roles.role', 'Actor')
    .select(['actors.name', 'actors.sex', 'actors.age']);
}

function getMovieGenres(id) {
  return knex('movies_genres')
    .join('genres', 'movies_genres.genre_id', 'genres.id')
    .select('genres.name')
    .where('movies_genres.movie_id', id);
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieActors,
  getMovieGenres,
  getMovieStaff
};

const knex = require('../connection');

function getAllMovies() {
  return knex('movies').select('*');
}

function getSingleMovie(id) {
  return knex('movies')
    .select('*')
    .where({ id: parseInt(id, 10) });
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
  return knex('movies')
    .select(['actors.name', 'actors.sex', 'actors.age'])
    .join('movie_makers', 'movies.id', 'movie_makers.movie_id')
    .join('actors', 'movie_makers.actor_id', 'actors.id')
    .join('movie_roles', 'movie_makers.role_id', 'movie_roles.id')
    .where('movies.id', id)
    .orWhere('movie_roles.role', 'Actor')
    .on('query', data => {
      console.log(data.sql);
    });
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieActors
};

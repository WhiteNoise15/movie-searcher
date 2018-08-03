const knex = require('../connection');
const { paginator } = require('../../utils/knexUtils');

function getAllGenres() {
  return knex('genres').select('*');
}

function getGenre(id) {
  return knex('genres')
    .select('*')
    .where({ id: parseInt(id, 10) });
}

function addGenre(genre) {
  return knex('genres')
    .insert(genre)
    .returning('*');
}

function updateGenre(id, genre) {
  return knex('genres')
    .update(genre)
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

function deleteGenre(id) {
  return knex('genres')
    .del()
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

function getGenreMovies(id, page, perPage) {
  const query = knex('genres')
    .innerJoin('movie_genres', 'movie_genres.genre_id', 'genres.id')
    .innerJoin('movies', 'movie_genres.movie_id', 'movies.id')
    .select('movies.*')
    .where({ 'genres.id': parseInt(id, 10) });

  return paginator(knex)(query, page, perPage);
}

module.exports = {
  getAllGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre,
  getGenreMovies
};

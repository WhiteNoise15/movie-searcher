const knex = require('../connection');

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

function getGenreMovies()

module.exports = {
  getAllGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre
};

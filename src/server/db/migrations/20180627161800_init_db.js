exports.up = function up(knex) {
  return createUserRolesTable()
    .then(createGenreTable)
    .then(createMovieRolesTable)
    .then(createUserTable)
    .then(createFilmmakersTable)
    .then(createMoviesTable)
    .then(createMovieRatinsgTable)
    .then(createMovieReviewsTable)
    .then(createMoviesGenresTable)
    .then(createMovieMakersTable);

  function createUserRolesTable() {
    return knex.schema.createTable('user_roles', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('role_name').notNullable();
    });
  }

  function createGenreTable() {
    return knex.schema.createTable('genres', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('name').notNullable();
    });
  }

  function createMovieRolesTable() {
    return knex.schema.createTable('movie_roles', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('role').notNullable();
    });
  }

  function createUserTable() {
    return knex.schema.createTable('users', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('name');
      table.string('email').unique();
      table.string('password');
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('user_roles');
    });
  }

  function createFilmmakersTable() {
    return knex.schema.createTable('filmmakers', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('name').notNullable();
      table.integer('age').unsigned();
      table.enu('sex', ['male', 'female']);
    });
  }

  function createMoviesTable() {
    return knex.schema.createTable('movies', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('name').notNullable();
      table.integer('year').unsigned();
    });
  }

  function createMovieRatinsgTable() {
    return knex.schema.createTable('movie_ratings', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movies');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table.enu('rating', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  }

  function createMoviesGenresTable() {
    return knex.schema.createTable('movies_genres', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table
        .integer('movie_id')
        .unsigned()
        .references('id')
        .inTable('movies');
      table
        .integer('genre_id')
        .unsigned()
        .references('id')
        .inTable('genres');
    });
  }

  function createMovieMakersTable() {
    return knex.schema.createTable('movie_makers', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table
        .integer('filmmaker_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('filmmakers');
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movies');
      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movie_roles');
    });
  }

  function createMovieReviewsTable() {
    return knex.schema.createTable('movie_reviews', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movies');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table.text('review').notNullable();
    });
  }
};

exports.down = function down(knex) {
  return knex.schema
    .dropTable('movie_makers')
    .dropTable('movie_ratings')
    .dropTable('movie_reviews')
    .dropTable('movies_genres')
    .dropTable('movies')
    .dropTable('genres')
    .dropTable('users')
    .dropTable('user_roles')
    .dropTable('filmmakers')
    .dropTable('movie_roles');
};

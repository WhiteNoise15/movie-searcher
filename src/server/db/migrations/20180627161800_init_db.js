exports.up = function up(knex) {
  return createUserRolesTable()
    .then(createGenreTable)
    .then(createMovieRolesTable)
    .then(createRatingsTable)
    .then(createUserTable)
    .then(createActorsTable)
    .then(createMoviesTable)
    .then(createMovieRatinsgTable)
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

  function createRatingsTable() {
    return knex.schema.createTable('ratings', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table
        .integer('rating')
        .unsigned()
        .notNullable();
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

  function createActorsTable() {
    return knex.schema.createTable('actors', table => {
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
      table
        .integer('rating_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ratings');
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
        .integer('actor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('actors');
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
};

exports.down = function down(knex) {
  return knex.schema
    .dropTable('movie_makers')
    .dropTable('movie_ratings')
    .dropTable('movies_genres')
    .dropTable('movies')
    .dropTable('genres')
    .dropTable('users')
    .dropTable('user_roles')
    .dropTable('ratings')
    .dropTable('actors')
    .dropTable('movie_roles');
};

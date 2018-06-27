exports.up = function up(knex, Promise) {
  return createUserRolesTable()
    .then(createGenreTable)
    .then(createMovieRolesTable)
    .then(createRatingsTable)
    .then(createUserTable)
    .then(createActorsTable)
    .then(createActorsRolesTable)
    .then(createMoviesTable)
    .then(createMovieRatinsgTable)
    .then(createMoviesGenresTable)
    .then(createMovieMakersTable);

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

  function createGenreTable() {
    return knex.schema.createTable('genres', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('name').notNullable();
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

  function createUserRolesTable() {
    return knex.schema.createTable('user_roles', table => {
      table
        .increments('id')
        .primary()
        .unsigned();
      table.string('role_name').notNullable();
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

  function createMovieMakersTable() {
    return knex.schema.createTable('mvoie_makers', table => {
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

  function createActorsRolesTable() {
    return knex.schema.createTable('actor_roles', table => {
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
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movie_roles');
    });
  }
};

exports.down = function down(knex, Promise) {
  return knex.schema
    .dropTable('movies')
    .dropTable('genres')
    .dropTable('movies_genres')
    .dropTable('user_roles')
    .dropTable('users')
    .dropTable('ratings')
    .dropTable('movie_ratings')
    .dropTable('actors')
    .dropTable('mvoie_makers')
    .dropTable('movie_roles')
    .dropTable('actor_roles');
};

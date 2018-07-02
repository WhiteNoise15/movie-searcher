exports.seed = (knex, Promise) => {
  return seedUserRoles()
    .then(seedGenres)
    .then(seedMovieRoles)
    .then(seedRatings)
    .then(seedUsers)
    .then(seedActors)
    .then(seedActorsRoles)
    .then(seedMovies)
    .then(seedMovieGenres)
    .then(seedMovieMakers);

  function seedUserRoles() {
    return knex('user_roles')
      .del()
      .then(() =>
        knex('user_roles').insert([
          { role_name: 'user' },
          { role_name: 'admin' }
        ])
      );
  }

  function seedGenres() {
    return knex('genres')
      .del()
      .then(() =>
        knex('genres').insert([
          { name: 'Comedy' },
          { name: 'Drama' },
          { name: 'Action' },
          { name: 'Horror' },
          { name: 'Thriller' },
          { name: 'Cartoon' },
          { name: 'Anime' }
        ])
      );
  }

  function seedMovieRoles() {
    return knex('movie_roles')
      .del()
      .then(() =>
        knex('movie_roles').insert([
          { role: 'Actor' },
          { role: 'Director' },
          { role: 'Producer' },
          { role: 'Director of photography' },
          { role: 'Composer' },
          { role: 'Screenwriter' }
        ])
      );
  }

  function seedRatings() {
    return knex('ratings')
      .del()
      .then(() =>
        knex('ratings').insert([
          { rating: '1' },
          { rating: '2' },
          { rating: '3' },
          { rating: '4' },
          { rating: '5' },
          { rating: '6' },
          { rating: '7' },
          { rating: '8' },
          { rating: '9' },
          { rating: '10' }
        ])
      );
  }

  function seedUsers() {
    return knex('users')
      .del()
      .then(() =>
        knex('users').insert([
          {
            name: 'yan',
            email: 'yzaytsev@voximplant.com',
            password: 'yan',
            role_id: 1
          },
          {
            name: 'admin',
            email: 'yan.zaycev15@gmail.com',
            password: 'admin',
            role_id: 2
          },
          {
            name: 'ivan',
            email: 'ivan@example.com',
            password: 'ivan',
            role_id: 1
          },
          {
            name: 'second_admin',
            email: 'danteivsinero@mail.ru',
            password: 'second_admin',
            role_id: 2
          }
        ])
      );
  }

  function seedActors() {
    return knex('actors')
      .del()
      .then(() =>
        knex('actors').insert([
          {
            name: 'Tom Hardy',
            age: 39,
            sex: 'male'
          },
          {
            name: 'Ryan Gosling',
            age: 37,
            sex: 'male'
          },
          {
            name: 'Meryl Streep',
            age: 69,
            sex: 'female'
          },
          {
            name: 'Naomi Watts',
            age: 49,
            sex: 'female'
          }
        ])
      );
  }

  function seedActorsRoles() {
    return knex('actor_roles')
      .del()
      .then(() =>
        knex('actor_roles').insert([
          { actor_id: 1, role_id: 1 },
          { actor_id: 2, role_id: 1 },
          { actor_id: 3, role_id: 1 },
          { actor_id: 4, role_id: 1 }
        ])
      );
  }

  function seedMovies() {
    return knex('movies')
      .del()
      .then(() =>
        knex('movies').insert([
          { name: 'Mulholland Dr.', year: 2001 },
          { name: 'The Deer Hunter', year: 1978 },
          { name: 'La La Land', year: 2016 },
          { name: 'Locke', year: 2013 }
        ])
      );
  }

  function seedMovieGenres() {
    return knex('movies_genres')
      .del()
      .then(() =>
        knex('movies_genres').insert([
          { movie_id: 1, genre_id: 5 },
          { movie_id: 2, genre_id: 2 }
        ])
      );
  }

  function seedMovieMakers() {
    return knex('movie_makers')
      .del()
      .then(() =>
        knex('movie_makers').insert([
          { movie_id: 1, actor_id: 4, role_id: 1 },
          { movie_id: 4, actor_id: 1, role_id: 1 }
        ])
      );
  }
};

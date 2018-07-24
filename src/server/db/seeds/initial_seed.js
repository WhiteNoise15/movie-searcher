exports.seed = knex => {
  return seedUserRoles()
    .then(seedGenres)
    .then(seedMovieRoles)
    .then(seedUsers)
    .then(seedFilmmakers)
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

  function seedFilmmakers() {
    return knex('filmmakers')
      .del()
      .then(() =>
        knex('filmmakers').insert([
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
          { movie_id: 1, genre_id: 2 },
          { movie_id: 2, genre_id: 2 }
        ])
      );
  }

  function seedMovieMakers() {
    return knex('movie_makers')
      .del()
      .then(() =>
        knex('movie_makers').insert([
          { movie_id: 1, filmmaker_id: 1, role_id: 1 },
          { movie_id: 1, filmmaker_id: 4, role_id: 1 },
          { movie_id: 4, filmmaker_id: 1, role_id: 1 }
        ])
      );
  }
};

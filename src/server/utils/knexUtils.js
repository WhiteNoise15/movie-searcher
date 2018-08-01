const paginator = knex => async (query, page = 1, perPage = 10) => {
  const countQuery = knex.count('* as total').from(query.clone().as('inner'));

  const offset = (page - 1) * perPage;

  query.offset(offset);
  query.limit(perPage);

  const [data, countResult] = await Promise.all([query, countQuery]);

  const { total } = countResult[0];

  return {
    pagination: {
      currentPage: page,
      perPage,
      total,
      lastPage: Math.ceil(total / perPage),
      from: offset,
      to: offset + data.length
    },
    data
  };
};

module.exports = { paginator };

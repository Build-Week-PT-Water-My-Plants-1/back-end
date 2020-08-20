// Update with your config settings.
const pgConnection =
  process.env.DATABASE_URL ||
  "postgres://uqfsxnxrbvwazc:771468d49fd21382c14cd58fd27c41a9b01c58efbc4f864041c928d4a7f47c44@ec2-184-73-249-9.compute-1.amazonaws.com:5432/daugjmoqo543pi";

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database_file.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/database_file.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};

import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: 'junction.proxy.rlwy.net',
  port: 49915,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
}

export const pool = new pg.Pool(config)

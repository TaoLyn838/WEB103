import pg from 'pg'
import { MongoClient, ServerApiVersion } from 'mongodb'

// Construct the MongoDB URI
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

let client
let db

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    await client.connect()
    db = client.db(process.env.DB_NAME)
    console.log(`Connected to ${process.env.DB_NAME} database`)
  }
  return client
}

export function getDatabase() {
  if (!db) {
    throw new Error('Call connectToDatabase first')
  }
  return db
}

// Construct the PostgreSQL configuration object
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
}

export const pool = new pg.Pool(config)

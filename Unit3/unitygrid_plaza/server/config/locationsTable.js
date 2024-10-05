import { pool } from './database.js'
import './dotenv.js'
import locationsData from '../data/locations.js'

const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(255) NOT NULL,
        image CHARACTER VARYING(255),
        address CHARACTER VARYING(255) NOT NULL,
        city CHARACTER VARYING(100) NOT NULL,
        state CHARACTER(2) NOT NULL,
        zip CHARACTER(5) NOT NULL
    );
`

const createLocationsTable = async () => {
  try {
    const res = await pool.query(createTableQuery)
    console.log('🛠️ \u00A0Locations table created')
  } catch (err) {
    console.error('⚠️ error creating locations table', err)
  }
}

const seedLocalLocationsTable = async () => {
  await createLocationsTable()

  locationsData.forEach((location) => {
    const insertQuery = {
      text: 'INSERT INTO locations (name, image, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)',
    }

    const values = [
      location.name,
      location.image,
      location.address,
      location.city,
      location.state,
      location.zip,
    ]

    pool.query(insertQuery.text, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting location', err)
      } else {
        console.log(`📍 ${location.name} inserted successfully`)
      }
    })
  })
}

export default {
  seedLocalLocationsTable,
}

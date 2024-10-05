import { pool } from './database.js'
import './dotenv.js'
import eventsData from '../data/events.js'

const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time INT NOT NULL,
        image VarChar(255) NOT NULL,
        locationId INT NOT NULL,
        FOREIGN KEY (locationId) references locations(id)
    )
`

const createEventsTable = async () => {
  try {
    const res = await pool.query(createTableQuery)
    console.log('🛠️ \u00A0Events table created')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedEventsTable = async () => {
  await createEventsTable()
  eventsData.forEach((event) => {
    const insertQuery = {
      text: 'INSERT INTO events (title, date, time, image, locationId) VALUES ($1, $2, $3, $4, $5)',
    }

    const values = [
      event.title,
      event.date,
      event.time,
      event.image,
      event.locationId,
    ]

    pool.query(insertQuery.text, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting event', err)
      } else {
        console.log(`🍻 ${event.title} inserted successfully`)
      }
    })
  })
}

export default {
  seedEventsTable,
}

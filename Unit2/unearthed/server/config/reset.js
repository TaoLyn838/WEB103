import { pool } from './database.js'
import './dotenv.js'
import giftData from '../data/gifts.js'

const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        pricePoint NUMERIC NOT NULL,    -- Change to NUMERIC to match the current table
        audience TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        submittedBy TEXT NOT NULL,      -- Match the type to TEXT
        submittedOn TIMESTAMP NOT NULL  -- Ensure consistency with TIMESTAMP without time zone
    )
`

const createGiftTable = async () => {
  try {
    const res = await pool.query(createTableQuery)
  } catch (err) {
    console.error('⚠️ error creating gifts table', err)
  }
}

const seedGiftsTable = async () => {
  await createGiftTable()

  giftData.forEach((gift) => {
    // Clean the pricePoint field by removing '$' and ',' symbols, and converting to a number
    const cleanedPricePoint = parseFloat(gift.pricePoint.replace(/[$,]/g, ''))

    const insertQuery = {
      text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    }

    const values = [
      gift.name,
      cleanedPricePoint, // Use the cleaned pricePoint
      gift.audience,
      gift.image,
      gift.description,
      gift.submittedBy,
      gift.submittedOn,
    ]

    pool.query(insertQuery.text, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting gift', err)
      } else {
        console.log('🎁 gift inserted successfully')
      }
    })
  })
}

seedGiftsTable()
console.log('🌱 seeding gifts table...')

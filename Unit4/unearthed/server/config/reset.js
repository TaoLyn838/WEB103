import { pool } from './database.js'
import { getDatabase, connectToDatabase } from './database.js'
import './dotenv.js'
import giftData from '../data/gifts.js'

////////////////////////////// PostgreSQL //////////////////////////////////////
const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      pricePoint VARCHAR(10) NOT NULL,
      audience VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP NOT NULL
    )
  `

const createGiftsTable = async () => {
  try {
    await pool.query(createTableQuery)
    console.log('🎉 gifts table created successfully')
  } catch (err) {
    console.error('⚠️ error creating gifts table', err)
  }
}

const seedGiftsTable = async () => {
  await createGiftsTable()

  giftData.forEach((gift) => {
    const insertQuery = {
      text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    }

    const values = [
      gift.name,
      gift.pricePoint,
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
////////////////////////////// PostgreSQL //////////////////////////////////////

////////////////////////////// MongoDB /////////////////////////////////////////
const resetGiftConnection = async () => {
  try {
    await connectToDatabase()
    const db = getDatabase()

    const collections = await db.listCollections({ name: 'gifts' }).toArray()
    if (collections.length > 0) {
      await db.collection('gifts').drop()
      console.log('🗑️ Dropped existing `gifts` collection')
    }
    const result = await db.collection('gifts').insertMany(giftData)
  } catch (error) {
    console.log(
      `🌱 Seeded ${result.insertedCount} gifts into the \`gifts\` collection`
    )
  } finally {
    process.exit(0)
  }
}
////////////////////////////// MongoDB /////////////////////////////////////////

console.log('🌱 seeding gifts table...')
// seedGiftsTable() // reset function for PostgreSQL
resetGiftConnection()

import { pool } from './database.js'
import './dotenv.js'
import genshinData from '../data/genshin.js'
import { getDatabase, connectToDatabase } from './database.js'

////////////////////////////// PostgreSQL //////////////////////////////////////
const createTableQuery = `
    DROP TABLE IF EXISTS genshin_characters;

    CREATE TABLE IF NOT EXISTS genshin_characters (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        quality TEXT NOT NULL,
        dob TEXT NOT NULL,
        region TEXT NOT NULL,
        element TEXT NOT NULL,
        weapon TEXT NOT NULL,
        image_home TEXT NOT NULL,
        image_card TEXT NOT NULL,
        description TEXT NOT NULL,
        detail TEXT NOT NULL
    )
`

const createGenshinTable = async () => {
  try {
    const res = await pool.query(createTableQuery)
    console.log('🛠️ Genshin characters table created')
  } catch (err) {
    console.error('⚠️ error creating genshin_characters table', err)
  }
}

const seedGenshinTable = async () => {
  await createGenshinTable()

  genshinData.forEach((character) => {
    const insertQuery = {
      text: 'INSERT INTO genshin_characters (name, quality, dob, region, element, weapon, image_home, image_card, description, detail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    }

    const values = [
      character.name,
      character.quality,
      character.dob,
      character.region,
      character.element,
      character.weapon,
      character.image_home,
      character.image_card,
      character.description,
      character.detail,
    ]

    pool.query(insertQuery.text, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting character', err)
      } else {
        console.log(`🎮 ${character.name} inserted successfully`)
      }
    })
  })
}

////////////////////////////// PostgreSQL //////////////////////////////////////

////////////////////////////// MongoDB /////////////////////////////////////////
const resetGenshinConnection = async () => {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const collection = await db
      .listCollections({ name: 'genshin_characters' })
      .toArray()

    if (collection.length > 0) {
      await collection.drop()
      console.log('🗑️ Genshin characters collection dropped')
    }

    await db.collection('genshin_characters').insertMany(genshinData)
    console.log('🌱 Genshin characters collection seeded')
  } catch (err) {
    console.error('❌ error resetting Genshin characters collection', err)
  } finally {
    process.exit(0) // exit the process after seeding
  }
}
////////////////////////////// MongoDB /////////////////////////////////////////

// Call the appropriate function to reset the database

console.log('🌱 seeding Genshin characters table...')
// seedGenshinTable() // reset function for PostgreSQL
resetGenshinConnection() // reset function for MongoDB

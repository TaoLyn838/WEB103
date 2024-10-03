import { pool } from './database.js'
import './dotenv.js'
import genshinData from '../data/genshin.js'

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

seedGenshinTable()
console.log('🌱 seeding Genshin characters table...')

// seedGenshinTable()
//   .then(() => {
//     console.log('✅ Genshin data successfully seeded')
//     process.exit(0) // Exit the script after data is seeded
//   })
//   .catch((err) => {
//     console.error('❌ Error seeding data', err)
//     process.exit(1)
//   })

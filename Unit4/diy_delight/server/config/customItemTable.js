import customItemData from '../data/customItemData.js'
import { pool } from './database.js'
import './dotenv.js'

const createTableQuery = `
  DROP TABLE IF EXISTS custom_items CASCADE;

  CREATE TABLE IF NOT EXISTS custom_items (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255)
  );
`

const createCustomItemTables = async () => {
  try {
    await pool.query(createTableQuery)
    console.log('🛠️ custom_items table created')
  } catch (error) {
    console.error('⚠️ Error creating custom_items table', error)
  }
}

const seedCustomItemTable = async () => {
  await createCustomItemTables()
  for (const customItem of customItemData) {
    const insertQuery =
      'INSERT INTO custom_items (category_id, name, price, image_url) VALUES ($1, $2, $3, $4)'
    const values = [
      customItem.category_id,
      customItem.name,
      customItem.price,
      customItem.image_url,
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`🍻 ${customItem.name} inserted successfully`)
    } catch (err) {
      console.error('⚠️ Error inserting custom item', err)
    }
  }
}

export default {
  seedCustomItemTable,
}

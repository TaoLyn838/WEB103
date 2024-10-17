import { pool } from './database.js'
import './dotenv.js'

const categories = ['exterior', 'wheels', 'interior']

const createCategoriesTableQuery = `
    DROP TABLE IF EXISTS categories CASCADE;
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`

const createCategoriesTable = async () => {
  try {
    await pool.query(createCategoriesTableQuery)
    console.log('🛠️ categories table created')
  } catch (error) {
    console.error('⚠️ Error creating categories table', error)
  }
}

const seedCategoriesTable = async () => {
  try {
    await createCategoriesTable()
    for (const category of categories) {
      const insertQuery = 'INSERT INTO categories (name) VALUES ($1)'
      const values = [category]
      await pool.query(insertQuery, values)
      console.log(`🍻 ${category} inserted successfully`)
    }
  } catch (error) {
    console.error('⚠️ Error seeding categories table', error)
  }
}

export default {
  seedCategoriesTable,
}

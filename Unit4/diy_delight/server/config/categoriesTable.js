import { pool, getDatabase, connectToDatabase } from './database.js'
import './dotenv.js'

// const categories = ['exterior', 'wheels', 'interior'] // PostgreSQL
// MongoDB categories
const categories = [
  {
    id: 1,
    name: 'exterior',
  },
  {
    id: 2,
    name: 'wheels',
  },
  {
    id: 3,
    name: 'interior',
  },
]

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

// MongoDB Connection
const seedCategoriesTableMongo = async () => {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const categoriesCollection = await db
      .listCollections({ name: 'categories' })
      .toArray()

    if (categoriesCollection) {
      await db.collection('categories').drop()
      console.log('🗑️ Dropped categories collection')
    }

    // insert categories into the categories collection
    await db.collection('categories').insertMany(categories)
    console.log('🍻 Categories inserted successfully')
  } catch (error) {
    console.error('⚠️ Error seeding categories collection', error)
  }
}

export default {
  seedCategoriesTable,
  seedCategoriesTableMongo,
}

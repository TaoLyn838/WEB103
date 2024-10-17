import { pool } from './database.js'
import './dotenv.js'
import userCars from '../data/userCarsData.js'

const createUserCarsTableQuery = `
    DROP TABLE IF EXISTS user_cars;
    CREATE TABLE IF NOT EXISTS user_cars (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        exterior_id INT REFERENCES custom_items(id),
        wheels_id INT REFERENCES custom_items(id),
        interior_id INT REFERENCES custom_items(id),
        total_price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`

const createUserCarsTable = async () => {
  try {
    await pool.query(createUserCarsTableQuery)
    console.log('🛠️ user_cars table created')
  } catch (error) {
    console.error('⚠️ Error creating user_cars table', error)
  }
}

const seedUserCarsTable = async () => {
  try {
    await createUserCarsTable()
    for (const car of userCars) {
      const insertQuery = `INSERT INTO user_cars (user_name, exterior_id, wheels_id, interior_id, total_price) VALUES ($1, $2, $3, $4, $5)`
      const values = [
        car.user_name,
        car.exterior_id,
        car.wheels_id,
        car.interior_id,
        car.total_price,
      ]
      await pool.query(insertQuery, values)
      console.log(`🚗 User car for ${car.user_name} inserted successfully`)
    }
  } catch (error) {
    console.error('⚠️ Error seeding user_cars table', error)
  }
}

export default {
  seedUserCarsTable,
}

import { pool } from '../config/database.js'

const getUserCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_cars')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserCarById = async (req, res) => {
  const carId = req.params.carId
  const selectQuery = `
        SELECT user_name, exterior_id, wheels_id, interior_id, total_price
        FROM user_cars
        WHERE id=$1
    `
  try {
    const result = await pool.query(selectQuery, [carId])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User car not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve user car' })
  }
}

const createUserCar = async (req, res) => {
  const { user_name, exterior_id, wheels_id, interior_id, total_price } =
    req.body
  try {
    const result = await pool.query(
      `
        INSERT INTO user_cars (user_name, exterior_id, wheels_id, interior_id, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [user_name, exterior_id, wheels_id, interior_id, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create user car' })
  }
}

const updateUserCar = async (req, res) => {
  const carId = req.params.carId
  const { user_name, exterior_id, wheels_id, interior_id, total_price } =
    req.body

  try {
    const updateQuery = `
      UPDATE user_cars
      SET user_name = $1,
          exterior_id = $2,
          wheels_id = $3,
          interior_id = $4,
          total_price = $5
      WHERE id = $6
      RETURNING *
    `
    const values = [
      user_name,
      exterior_id,
      wheels_id,
      interior_id,
      total_price,
      carId,
    ]

    const result = await pool.query(updateQuery, values)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json({
      message: `Car ID: ${carId} has been successfully updated`,
      updatedCar: result.rows[0],
    })
  } catch (error) {
    console.error('Error updating car:', error) // Log the actual error
    res.status(500).json({ error: 'An error occurred while updating the car' })
  }
}

const deleteUserCar = async (req, res) => {
  const carId = req.params.carId
  try {
    const result = await pool.query(
      `
        DELETE FROM user_cars
        WHERE id = $1
        RETURNING *
      `,
      [carId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.status(200).json({
      message: `Car ID: ${carId} has been successfully deleted`,
      deletedCar: result.rows[0],
    })
  } catch (error) {
    console.error('Error deleting car:', error)
    res.status(500).json({ error: 'An error occurred while deleting the car' })
  }
}

export default {
  getUserCars,
  getUserCarById,
  createUserCar,
  updateUserCar,
  deleteUserCar,
}

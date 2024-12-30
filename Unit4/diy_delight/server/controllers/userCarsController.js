import { connectToDatabase, getDatabase, pool } from '../config/database.js'

// // PostgreSQL db
// const getUserCars = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM user_cars')
//     res.status(200).json(result.rows)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// const getUserCarById = async (req, res) => {
//   const carId = req.params.carId
//   const selectQuery = `
//         SELECT user_name, exterior_id, wheels_id, interior_id, total_price
//         FROM user_cars
//         WHERE id=$1
//     `
//   try {
//     const result = await pool.query(selectQuery, [carId])
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User car not found' })
//     }
//     res.status(200).json(result.rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve user car' })
//   }
// }

// const createUserCar = async (req, res) => {
//   const { user_name, exterior_id, wheels_id, interior_id, total_price } =
//     req.body
//   try {
//     const result = await pool.query(
//       `
//         INSERT INTO user_cars (user_name, exterior_id, wheels_id, interior_id, total_price)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING *
//         `,
//       [user_name, exterior_id, wheels_id, interior_id, total_price]
//     )
//     res.status(201).json(result.rows[0])
//   } catch (error) {
//     console.error(err)
//     res.status(500).json({ error: 'Failed to create user car' })
//   }
// }

// const updateUserCar = async (req, res) => {
//   const carId = req.params.carId
//   const { user_name, exterior_id, wheels_id, interior_id, total_price } =
//     req.body

//   try {
//     const updateQuery = `
//       UPDATE user_cars
//       SET user_name = $1,
//           exterior_id = $2,
//           wheels_id = $3,
//           interior_id = $4,
//           total_price = $5
//       WHERE id = $6
//       RETURNING *
//     `
//     const values = [
//       user_name,
//       exterior_id,
//       wheels_id,
//       interior_id,
//       total_price,
//       carId,
//     ]

//     const result = await pool.query(updateQuery, values)

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Car not found' })
//     }

//     res.status(200).json({
//       message: `Car ID: ${carId} has been successfully updated`,
//       updatedCar: result.rows[0],
//     })
//   } catch (error) {
//     console.error('Error updating car:', error) // Log the actual error
//     res.status(500).json({ error: 'An error occurred while updating the car' })
//   }
// }

// const deleteUserCar = async (req, res) => {
//   const carId = req.params.carId
//   try {
//     const result = await pool.query(
//       `
//         DELETE FROM user_cars
//         WHERE id = $1
//         RETURNING *
//       `,
//       [carId]
//     )
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Car not found' })
//     }
//     res.status(200).json({
//       message: `Car ID: ${carId} has been successfully deleted`,
//       deletedCar: result.rows[0],
//     })
//   } catch (error) {
//     console.error('Error deleting car:', error)
//     res.status(500).json({ error: 'An error occurred while deleting the car' })
//   }
// }

// MongoDB db
const getUserCars = async (req, res) => {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const userCars = await db.collection('user_cars').find().toArray()
    res.status(200).json(userCars)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserCarById = async (req, res) => {
  const carId = parseInt(req.params.carId)
  try {
    await connectToDatabase()
    const db = getDatabase()
    const userCar = await db.collection('user_cars').findOne({ id: carId })
    if (!userCar) {
      return res.status(404).json({ error: 'User car not found' })
    }
    res.status(200).json(userCar)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve user car' })
  }
}

const createUserCar = async (req, res) => {
  const { user_name, exterior_id, wheels_id, interior_id, total_price } =
    req.body

  // Validate input
  if (
    !user_name ||
    !exterior_id ||
    !wheels_id ||
    !interior_id ||
    !total_price
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Connect to database
    await connectToDatabase()
    const db = getDatabase()

    // Get the next ID by finding the max ID and incrementing it
    const lastCar = await db
      .collection('user_cars')
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray()

    const newId = lastCar.length > 0 ? lastCar[0].id + 1 : 1 // Start at 1 if no cars exist

    // Insert new car with the generated ID
    await db.collection('user_cars').insertOne({
      id: newId,
      user_name,
      exterior_id,
      wheels_id,
      interior_id,
      total_price,
    })

    // Respond with the created car
    const newCar = await db.collection('user_cars').findOne({ id: newId })
    res.status(201).json(newCar)
  } catch (error) {
    console.error('Error creating user car:', error.message)
    res.status(500).json({ error: 'Failed to create user car' })
  }
}

const updateUserCar = async (req, res) => {
  const carId = parseInt(req.params.carId)
  const { user_name, exterior_id, wheels_id, interior_id, total_price } =
    req.body
  try {
    await connectToDatabase()
    const db = getDatabase()
    const result = await db.collection('user_cars').findOneAndUpdate(
      { id: carId },
      {
        $set: { user_name, exterior_id, wheels_id, interior_id, total_price },
      },
      { returnDocument: 'after' }
    )
    if (!result.value) {
      return res.status(404).json({ error: 'User car not found' })
    }
    res.status(200).json(result.value)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update user car' })
  }
}

const deleteUserCar = async (req, res) => {
  const carId = parseInt(req.params.carId)
  try {
    await connectToDatabase()
    const db = getDatabase()
    const result = await db
      .collection('user_cars')
      .findOneAndDelete({ id: carId })
    if (!result.value) {
      return res.status(404).json({ error: 'User car not found' })
    }
    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete user car' })
  }
}

export default {
  getUserCars,
  getUserCarById,
  createUserCar,
  updateUserCar,
  deleteUserCar,
}

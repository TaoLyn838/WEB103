import { connectToDatabase, getDatabase, pool } from '../config/database.js'
import { ObjectId } from 'mongodb'

// const getLocations = async (req, res) => {
//   try {
//     const locations = await pool.query('SELECT * FROM locations')
//     res.json(locations.rows)
//   } catch (err) {
//     console.error(err.message)
//   }
// }

// const getLocationsById = async (req, res) => {
//   try {
//     const selectQuery = `
//         SELECT name, image, address, city, state, zip
//         FROM locations
//         WHERE id=$1
//     `

//     const locationId = req.params.locationId

//     const result = await pool.query(selectQuery, [locationId])

//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0])
//     } else {
//       res.status(404).json({ error: 'Location not found' })
//     }
//   } catch (error) {
//     res.status(409).json({ error: error.message })
//   }
// }

// MongoDB version
const getLocations = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase()
    const db = getDatabase()
    const locations = await db.collection('locations').find({}).toArray()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocationsById = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase()
    const db = getDatabase()
    const locationId = parseInt(req.params.locationId)

    const location = await db
      .collection('locations')
      .findOne({ id: locationId })

    if (location) {
      res.json(location)
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getLocations,
  getLocationsById,
}

import { pool } from '../config/database.js'

const getLocations = async (req, res) => {
  try {
    const locations = await pool.query('SELECT * FROM locations')
    res.json(locations.rows)
  } catch (err) {
    console.error(err.message)
  }
}

const getLocationsById = async (req, res) => {
  try {
    const selectQuery = `
        SELECT name, image, address, city, state, zip
        FROM locations
        WHERE id=$1
    `

    const locationId = req.params.locationId

    const result = await pool.query(selectQuery, [locationId])

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getLocations,
  getLocationsById,
}

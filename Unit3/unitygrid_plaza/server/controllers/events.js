import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const getEventById = async (req, res) => {
  try {
    const selectQuery = `
        SELECT title, date, time, image, locationid
        FROM events
        WHERE id=$1
    `
    const eventId = req.params.eventId

    const result = await pool.query(selectQuery, [eventId])

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getEventByLocationId = async (req, res) => {
  try {
    const selectQurey = `
        SELECT title, date, time, image, locationid
        FROM events
        WHERE locationid=$1
    `
    const locationId = req.params.locationId

    const result = await pool.query(selectQurey, [locationId])

    if (result.rows.length > 0) {
      res.status(200).json(result.rows)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getEvents,
  getEventById,
  getEventByLocationId,
}

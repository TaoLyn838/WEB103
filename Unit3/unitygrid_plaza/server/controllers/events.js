import { connectToDatabase, getDatabase, pool } from '../config/database.js'

// const getEvents = async (req, res) => {
//   try {
//     const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
//     res.status(200).json(results.rows)
//   } catch (err) {
//     res.status(409).json({ error: err.message })
//   }
// }

// const getEventById = async (req, res) => {
//   try {
//     const selectQuery = `
//         SELECT title, date, time, image, locationid
//         FROM events
//         WHERE id=$1
//     `
//     const eventId = req.params.eventId

//     const result = await pool.query(selectQuery, [eventId])

//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0])
//     } else {
//       res.status(404).json({ error: 'Event not found' })
//     }
//   } catch (error) {
//     res.status(409).json({ error: error.message })
//   }
// }

// const getEventByLocationId = async (req, res) => {
//   try {
//     const selectQurey = `
//         SELECT title, date, time, image, locationid
//         FROM events
//         WHERE locationid=$1
//     `
//     const locationId = req.params.locationId

//     const result = await pool.query(selectQurey, [locationId])

//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows)
//     } else {
//       res.status(404).json({ error: 'Event not found' })
//     }
//   } catch (error) {
//     res.status(409).json({ error: error.message })
//   }
// }

// MongoDB version
const getEvents = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase()
    const db = getDatabase()

    // Fetch all events sorted by 'id' in ascending order
    const results = await db
      .collection('events')
      .find()
      .sort({ id: 1 })
      .toArray()

    // Send the results as JSON
    res.status(200).json(results)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const getEventById = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase()
    const db = getDatabase()

    // Fetch the event with the specified 'id'
    const result = await db
      .collection('events')
      .findOne({ id: parseInt(req.params.eventId) })

    // If the event exists, send it as JSON
    if (result) {
      res.status(200).json(result)
    } else {
      // Otherwise, send an error message
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getEventByLocationId = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase()
    const db = getDatabase()

    // Fetch all events with the specified 'locationid'
    const results = await db
      .collection('events')
      .find({ locationId: parseInt(req.params.locationId) })
      .toArray()

    // If events exist, send them as JSON
    if (results.length > 0) {
      res.status(200).json(results)
    } else {
      // Otherwise, send an error message
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

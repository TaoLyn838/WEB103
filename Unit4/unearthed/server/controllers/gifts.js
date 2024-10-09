import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getGiftById = async (req, res) => {
  try {
    const selectQuery = `
        SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
        FROM gifts
        WHERE id=$1
    `
    const giftId = req.params.giftId

    const result = await pool.query(selectQuery, [giftId])

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).json({ error: 'Gift not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getGifts,
  getGiftById,
}

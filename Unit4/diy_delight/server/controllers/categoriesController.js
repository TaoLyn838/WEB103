import { pool } from '../config/database.js'

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId
  try {
    const result = await pool.query('SELECT name FROM categories WHERE id=$1', [
      categoryId,
    ])
    if (result.rows[0] === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve category data' })
  }
}

export default {
  getCategories,
  getCategoryById,
}

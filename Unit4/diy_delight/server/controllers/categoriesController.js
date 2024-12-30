import { connectToDatabase, getDatabase, pool } from '../config/database.js'

// // PostgreSQL db
// const getCategories = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM categories')
//     res.status(200).json(result.rows)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// const getCategoryById = async (req, res) => {
//   const categoryId = req.params.categoryId
//   try {
//     const result = await pool.query('SELECT name FROM categories WHERE id=$1', [
//       categoryId,
//     ])
//     if (result.rows[0] === 0) {
//       return res.status(404).json({ error: 'Category not found' })
//     }
//     res.status(200).json(result.rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve category data' })
//   }
// }

// MongoDB db
const getCategories = async (req, res) => {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const categories = await db.collection('categories').find().toArray()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCategoryById = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId)
  try {
    await connectToDatabase()
    const db = getDatabase()
    const category = await db
      .collection('categories')
      .findOne({ id: categoryId })
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve category data' })
  }
}

export default {
  getCategories,
  getCategoryById,
}

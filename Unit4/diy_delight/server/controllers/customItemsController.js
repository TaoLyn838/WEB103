import { connectToDatabase, getDatabase, pool } from '../config/database.js'

// // PostgreSQL db
// const getCustomItems = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM custom_items')
//     res.status(200).json(result.rows)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve custom items' })
//   }
// }

// const getCustomItemById = async (req, res) => {
//   const itemId = req.params.itemId
//   const selectQuery = `
//         SELECT * FROM custom_items
//         WHERE id=$1
//     `
//   try {
//     const result = await pool.query(selectQuery, [itemId])

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Item not found' })
//     }
//     res.status(200).json(result.rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve custom item' })
//   }
// }

// const getCustomItemsByCategory = async (req, res) => {
//   const categoryId = req.params.categoryId
//   try {
//     const result = await pool.query(
//       `
//         SELECT * FROM custom_items
//         WHERE category_id=$1
//       `,
//       [categoryId]
//     )
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Custom items not found ' })
//     }
//     res.status(200).json(result.rows)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve custom items' })
//   }
// }

// const getCustomItemByCategoryAndName = async (req, res) => {
//   const { categoryId, name } = req.query
//   console.log(`Category ID: ${categoryId}, Name: ${name}`) // Debugging statement

//   try {
//     const result = await pool.query(
//       `
//         SELECT * FROM custom_items
//         WHERE category_id = $1 AND name = $2
//       `,
//       [categoryId, name]
//     )
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Custom item not found ' })
//     }
//     res.status(200).json(result.rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to retrieve custom item' })
//   }
// }

// MongoDB db
const getCustomItems = async (req, res) => {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const customItems = await db.collection('custom_items').find().toArray()
    res.status(200).json(customItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCustomItemById = async (req, res) => {
  const itemId = parseInt(req.params.itemId)
  try {
    await connectToDatabase()
    const db = getDatabase()
    const customItem = await db
      .collection('custom_items')
      .findOne({ id: itemId })
    if (!customItem) {
      return res.status(404).json({ error: 'Custom item not found' })
    }
    res.status(200).json(customItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve custom item' })
  }
}

const getCustomItemsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId)
  try {
    await connectToDatabase()
    const db = getDatabase()
    const customItems = await db
      .collection('custom_items')
      .find({ category_id: categoryId })
      .toArray()
    if (customItems.length === 0) {
      return res.status(404).json({ error: 'Custom items not found' })
    }
    res.status(200).json(customItems)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve custom items' })
  }
}

const getCustomItemByCategoryAndName = async (req, res) => {
  const { categoryId, name } = req.query
  try {
    await connectToDatabase()
    const db = getDatabase()
    const customItem = await db
      .collection('custom_items')
      .findOne({ category_id: parseInt(categoryId), name: name })
    if (!customItem) {
      return res.status(404).json({ error: 'Custom item not found' })
    }
    res.status(200).json(customItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve custom item' })
  }
}

export default {
  getCustomItems,
  getCustomItemById,
  getCustomItemsByCategory,
  getCustomItemByCategoryAndName,
}

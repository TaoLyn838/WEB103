import { getDatabase } from '../config/database.js'

const getGifts = async (req, res) => {
  try {
    const db = getDatabase() // Access the connected database
    const gifts = await db
      .collection('gifts')
      .find({})
      .sort({ id: 1 })
      .toArray() // Fetch and sort by `id`
    // console.log('Fetched gifts:', gifts) // Debugging log
    res.status(200).json(gifts) // Return the gifts
  } catch (error) {
    console.error('Error in getGifts:', error.message)
    res.status(500).json({ error: error.message }) // Send error response
  }
}

const getGiftById = async (req, res) => {
  try {
    const db = getDatabase()
    const giftId = parseInt(req.params.giftId)

    const gift = await db.collection('gifts').findOne({ id: giftId })

    if (gift) {
      res.status(200).json(gift)
    } else {
      res.status(404).json({ error: 'Gift not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createGift = async (req, res) => {
  try {
    const db = getDatabase()
    const {
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    } = req.body

    const result = await db.collection('gifts').insertOne({
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    })

    res.status(201).json(result.ops[0]) // `ops` contains the inserted document
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateGift = async (req, res) => {
  try {
    const db = getDatabase()
    const giftId = parseInt(req.params.id)

    const {
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    } = req.body

    const result = await db.collection('gifts').findOneAndUpdate(
      { id: giftId },
      {
        $set: {
          name,
          pricepoint,
          audience,
          image,
          description,
          submittedby,
          submittedon,
        },
      },
      { returnDocument: 'after' } // Returns the updated document
    )

    if (result.value) {
      res.status(200).json(result.value)
    } else {
      res.status(404).json({ error: 'Gift not found' })
    }
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteGift = async (req, res) => {
  try {
    const db = getDatabase()
    const giftId = parseInt(req.params.id)

    const result = await db.collection('gifts').findOneAndDelete({ id: giftId })

    if (result) {
      res.status(200).json({
        message: `Gift id: ${result.id} with named '${result.name}', has been deleted`,
      })
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
  createGift,
  updateGift,
  deleteGift,
}

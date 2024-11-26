import path from 'path'
import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import { connectToDatabase } from './config/database.js'
import giftsRouter from './routes/gifts.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>'
    )
})
;(async () => {
  try {
    await connectToDatabase()
    console.log('MongoDB connection initialized.')

    // Routes
    app.use('/gifts', giftsRouter)

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    process.exit(1)
  }
})()

// Code for pg db
// app.use('/gifts', giftsRouter)

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server listening on http://localhost:${PORT}`)
// })

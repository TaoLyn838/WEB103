import express from 'express'
import path from 'path'
import giftsRouter from './routes/gifts.js'
import './config/dotenv.js'
import cors from 'cors'

const app = express()
// add the cors middleware.
app.use(cors())

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>'
    )
})
app.use('/gifts', giftsRouter)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

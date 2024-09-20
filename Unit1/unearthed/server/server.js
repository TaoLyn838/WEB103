import express from 'express'
import path from 'path'
import giftsRouter from './routes/gifts.js'

const app = express()

app.use('/public', express.static('../client/public'))
app.use('/scripts', express.static('../client/public/scripts'))

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

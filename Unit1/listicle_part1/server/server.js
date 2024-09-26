import express from 'express'
import charaterRouter from './routes/genshin.js'

const app = express()

app.use('/public', express.static('../client/public'))
app.use('/scripts', express.static('../client/public/scripts'))

app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">Listicle API</h1>')
})
app.use('/characters', charaterRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

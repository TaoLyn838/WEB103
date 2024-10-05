import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import './config/dotenv.js'
import './config/reset.js'
import cors from 'cors'

// import the router from your routes file
import LocationRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'party.png')))
  app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api', LocationRouter)
app.use('/api', eventsRouter)

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) => res.sendFile(path.resolve('public', 'index.html')))
}
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})

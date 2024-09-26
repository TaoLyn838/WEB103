import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import charaterData from '../data/genshin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(charaterData)
})

router.get('/:characterId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/character.html'))
})

export default router

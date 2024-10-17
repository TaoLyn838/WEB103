import express from 'express'
import categoriesAPI from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/categories', categoriesAPI.getCategories)
router.get('/categories/:categoryId', categoriesAPI.getCategoryById)

export default router

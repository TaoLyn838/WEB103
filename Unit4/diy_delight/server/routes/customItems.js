import express from 'express'
import customItemsAPI from '../controllers/customItemsController.js'

const router = express.Router()

router.get('/customItems', customItemsAPI.getCustomItems)
router.get('/customItems/:itemId', customItemsAPI.getCustomItemById)
router.get('/customItems', customItemsAPI.getCustomItemByCategoryAndName)
router.get(
  '/customItems/category/:categoryId',
  customItemsAPI.getCustomItemsByCategory
)

export default router

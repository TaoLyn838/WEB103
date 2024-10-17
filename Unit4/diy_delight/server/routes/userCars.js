import express from 'express'
import userCarsAPIs from '../controllers/userCarsController.js'

const router = express.Router()

router.get('/customCars', userCarsAPIs.getUserCars)
router.get('/customCars/:carId', userCarsAPIs.getUserCarById)
router.post('/customCars', userCarsAPIs.createUserCar)
router.patch('/customCars/:carId', userCarsAPIs.updateUserCar)
router.delete('/customCars/:carId', userCarsAPIs.deleteUserCar)

export default router

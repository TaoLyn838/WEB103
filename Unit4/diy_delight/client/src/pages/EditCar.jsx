import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import apiController from '../api/APIs.jsx'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState({
    user_name: '',
    exterior_id: 0,
    wheels_id: 0,
    interior_id: 0,
    total_price: 65000,
  })

  const [customItems, setCustomItems] = useState([])

  useEffect(() => {
    const fetchCar = async () => {
      const carData = await apiController.fetchCustomCarById(id)
      setCar({
        ...carData,
        exterior_id: parseInt(carData.exterior_id) || 0,
        wheels_id: parseInt(carData.wheels_id) || 0,
        interior_id: parseInt(carData.interior_id) || 0,
        total_price: parseFloat(carData.total_price) || 65000,
      })
    }

    const fetchCustomItems = async () => {
      const items = await apiController.fetchCustomItems()
      setCustomItems(items)
    }

    fetchCar()
    fetchCustomItems()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCar((prevCar) => {
      const updatedCar = {
        ...prevCar,
        [name]: name === 'user_name' ? value : parseInt(value) || 0,
      }

      const newTotalPrice = 65000 + calculateTotalPrice(updatedCar)
      return { ...updatedCar, total_price: newTotalPrice }
    })
  }

  const calculateTotalPrice = (car) => {
    let additionalPrice = 0

    if (car.exterior_id) {
      const exterior = customItems.find((item) => item.id === car.exterior_id)
      if (exterior) {
        additionalPrice += parseFloat(exterior.price)
      }
    }

    if (car.wheels_id) {
      const wheels = customItems.find((item) => item.id === car.wheels_id)
      if (wheels) {
        additionalPrice += parseFloat(wheels.price)
      }
    }

    if (car.interior_id) {
      const interior = customItems.find((item) => item.id === car.interior_id)
      if (interior) {
        additionalPrice += parseFloat(interior.price)
      }
    }

    return additionalPrice
  }

  const handleSave = async () => {
    await apiController.updateCustomCarById(id, car)
    window.alert('Car details updated successfully!')
    navigate('/customcars')
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this car?'
    )
    if (confirmDelete) {
      await apiController.deleteCustomCarById(id)
      window.alert('Car deleted successfully!')
      navigate('/customcars')
    }
  }

  return (
    <div className="edit-car">
      <h2>Edit Car Details</h2>
      <label>
        User Name:
        <input
          type="text"
          name="user_name"
          value={car.user_name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Exterior:
        <select
          name="exterior_id"
          value={car.exterior_id}
          onChange={handleInputChange}
        >
          <option value="0">Select Exterior</option>
          {customItems
            .filter((item) => item.category_id === 1)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>

      <label>
        Wheels:
        <select
          name="wheels_id"
          value={car.wheels_id}
          onChange={handleInputChange}
        >
          <option value="0">Select Wheels</option>
          {customItems
            .filter((item) => item.category_id === 2)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>

      <label>
        Interior:
        <select
          name="interior_id"
          value={car.interior_id}
          onChange={handleInputChange}
        >
          <option value="0">Select Interior</option>
          {customItems
            .filter((item) => item.category_id === 3)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>

      <label>
        Total Price:
        <input
          type="number"
          name="total_price"
          value={car.total_price || 65000}
          readOnly
        />
      </label>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete} className="secondary">
        Delete
      </button>
    </div>
  )
}

export default EditCar

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import apiController from '../api/APIs.jsx'

const CreateCar = () => {
  const navigate = useNavigate()

  const [newCar, setNewCar] = useState({
    user_name: '',
    exterior_id: 0,
    wheels_id: 0,
    interior_id: 0,
    total_price: 65000,
  })

  const [customItems, setCustomItems] = useState([])

  useState(() => {
    const fetchCustomItems = async () => {
      const items = await apiController.fetchCustomItems()
      setCustomItems(items)
    }

    fetchCustomItems()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCar((prevCar) => {
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

  const handleCreate = async () => {
    await apiController.createCustomCar(newCar)
    window.alert('Car created successfully!')
    navigate('/customcars')
  }

  return (
    <div className="create-car">
      <h2>Create New Car</h2>
      <label>
        User Name:
        <input
          type="text"
          name="user_name"
          value={newCar.user_name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Exterior:
        <select
          name="exterior_id"
          value={newCar.exterior_id}
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
          value={newCar.wheels_id}
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
          value={newCar.interior_id}
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
          value={newCar.total_price || 65000}
          readOnly
        />
      </label>

      <button onClick={handleCreate}>Create Car</button>
    </div>
  )
}

export default CreateCar

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import apiController from '../api/APIs.jsx'

const CarDetails = () => {
  const { id } = useParams()

  const [car, setCar] = useState({
    id: '',
    user_name: '',
    exterior_id: 0,
    wheels_id: 0,
    interior_id: 0,
    total_price: 0,
  })

  const [exterior, setExterior] = useState({
    id: '',
    category_id: '',
    name: '',
    price: 0,
    image_url: '',
  })
  const [wheels, setWheels] = useState({
    id: '',
    category_id: '',
    name: '',
    price: 0,
    image_url: '',
  })
  const [interior, setInterior] = useState({
    id: '',
    category_id: '',
    name: '',
    price: 0,
    image_url: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the car
      const carData = await apiController.fetchCustomCarById(id)
      setCar(carData)

      // Fetch the custom items for the car
      const exteriorData = await apiController.fetchCustomItemById(
        carData.exterior_id
      )
      setExterior(exteriorData)

      const wheelsData = await apiController.fetchCustomItemById(
        carData.wheels_id
      )
      setWheels(wheelsData)

      const interiorData = await apiController.fetchCustomItemById(
        carData.interior_id
      )
      setInterior(interiorData)
    }
    fetchData()
  }, [id])

  return (
    <article
      className="container"
      style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
    >
      <header
        className="car-header"
        style={{ marginBottom: '20px', textAlign: 'center' }}
      >
        <h3>{car.user_name}'s Custom Car</h3>
      </header>

      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px',
        }}
      >
        <div
          className="card"
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h4>Exterior</h4>
          <img
            src={exterior.image_url}
            alt={exterior.name}
            className="car-image"
            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
          />
          <p>{exterior.name}</p>
          <p>Price: ${exterior.price}</p>
        </div>
        <div
          className="card"
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h4>Wheels</h4>
          <img
            src={wheels.image_url}
            alt={wheels.name}
            className="car-image"
            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
          />
          <p>{wheels.name}</p>
          <p>Price: ${wheels.price}</p>
        </div>
        <div
          className="card"
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h4>Interior</h4>
          <img
            src={interior.image_url}
            alt={interior.name}
            className="car-image"
            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
          />
          <p>{interior.name}</p>
          <p>Price: ${interior.price}</p>
        </div>
      </div>

      <footer
        className="car-footer"
        style={{ marginTop: '20px', textAlign: 'center' }}
      >
        <p className="total-price" style={{ fontSize: '1.2em' }}>
          💰: <strong>${car.total_price}</strong>
        </p>
      </footer>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <button onClick={() => (window.location.href = `/edit/${id}`)}>
          Edit Car
        </button>
      </div>
    </article>
  )
}

export default CarDetails

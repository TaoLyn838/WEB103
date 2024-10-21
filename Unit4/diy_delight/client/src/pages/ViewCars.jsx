import React, { useEffect, useState } from 'react'
import '../App.css'
import apiController from '../api/APIs'
import { Link } from 'react-router-dom'
import '../css/ViewCars.css'

const ViewCars = () => {
  const [cars, setCars] = useState([]) // State to store car data
  const [loading, setLoading] = useState(true) // State to track loading status

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await apiController.fetchCustomCars()
        setCars(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching car data:', error)
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <div className="view-cars-container">
      {loading ? (
        <div className="loading-container">
          <span aria-busy="true" className="loading">
            Loading...
          </span>
        </div>
      ) : (
        <div className="cars-list">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-card-header">
                <h3 className="car-user-name">👤 {car.user_name}</h3>
                <p className="car-price">
                  <strong>💵 Price:</strong> $
                  {parseFloat(car.total_price).toFixed(2)}
                </p>
              </div>
              <div className="car-card-body">
                <p className="car-date">
                  <strong>🕰️:</strong>{' '}
                  {new Date(car.created_at).toLocaleDateString()}
                </p>
                <Link
                  to={`/customcars/${car.id}`}
                  className="view-details-link"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewCars

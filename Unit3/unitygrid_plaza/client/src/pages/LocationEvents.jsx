import React, { useState, useEffect } from 'react'
import Event from '../components/Event.jsx'
import '../css/LocationEvents.css'
import LocationsAPI from '../servers/LocationsAPI.jsx'
import EventsAPI from '../servers/EventsAPI.jsx'

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getLocation = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(index)
        setLocation(locationData)
      } catch (error) {
        console.error(error)
      }
    }
    getLocation()
  }, [index])

  useEffect(() => {
    const getLocationEvents = async () => {
      try {
        const locationEventsData = await EventsAPI.getEventByLocationId(index)
        setEvents(locationEventsData)
      } catch (error) {
        console.error(error)
      }
    }
    getLocationEvents()
  }, [index])

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
            {'No events scheduled at this location yet!'}
          </h2>
        )}
      </main>
    </div>
  )
}

export default LocationEvents

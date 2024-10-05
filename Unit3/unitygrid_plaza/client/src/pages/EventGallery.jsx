import React, { useState, useEffect } from 'react'
import Event from '../components/Event.jsx'
import EventsAPI from '../servers/EventsAPI.jsx'
import '../css/EventGallery.css'

const EventGallery = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const eventData = await EventsAPI.getAllEvents()
        setEvents(eventData)
      } catch (error) {
        throw error
      }
    }
    getAllEvents()
  }, [])

  return (
    <section className="event-gallery">
      {events.map((event) => (
        <Event
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          time={event.time}
        />
      ))}
    </section>
  )
}

export default EventGallery

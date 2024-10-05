const getAllEvents = async () => {
  try {
    const response = await fetch('/api/events')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getEventById = async (id) => {
  try {
    const response = await fetch(`/api/events/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getEventByLocationId = async (id) => {
  try {
    const response = await fetch(`/api/events/location/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default {
  getAllEvents,
  getEventById,
  getEventByLocationId,
}

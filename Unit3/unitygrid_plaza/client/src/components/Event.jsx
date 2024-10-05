import '../css/Event.css'

const Event = ({ id, title, date, image, time }) => {
  return (
    <article className="event-information" id={id}>
      <img src={image} alt={`${title} event image`} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {date}
            <br /> {time}
          </p>
          {/* <p id={`remaining-${id}`}>{remaining}</p> */}
        </div>
      </div>
    </article>
  )
}

export default Event

// const [event, setEvent] = useState([])
// const [time, setTime] = useState([])
// const [remaining, setRemaining] = useState([])

// useEffect(() => {
//   ;(async () => {
//     try {
//       const eventData = await EventsAPI.getEventsById(props.id)
//       setEvent(eventData)
//     } catch (error) {
//       throw error
//     }
//   })()
// }, [])

// useEffect(() => {
//   ;(async () => {
//     try {
//       const result = await dates.formatTime(event.time)
//       setTime(result)
//     } catch (error) {
//       throw error
//     }
//   })()
// }, [event])

// useEffect(() => {
//   ;(async () => {
//     try {
//       const timeRemaining = await dates.formatRemainingTime(event.remaining)
//       setRemaining(timeRemaining)
//       dates.formatNegativeTimeRemaining(remaining, event.id)
//     } catch (error) {
//       throw error
//     }
//   })()
// }, [event])

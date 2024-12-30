import './dotenv.js'
import eventsDb from './eventsTable.js'
import locationsDb from './locationsTable.js'

const seedTables = async () => {
  await locationsDb.resetLocationsTable()
  await eventsDb.resetEventsTable()
  console.log('🌱 Tables seeded')
  process.exit(0)
}

seedTables()

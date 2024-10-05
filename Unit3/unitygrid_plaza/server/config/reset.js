import './dotenv.js'
import eventsDb from './eventsTable.js'
import locationsDb from './locationsTable.js'

const seedTables = async () => {
  await locationsDb.seedLocalLocationsTable()
  await eventsDb.seedEventsTable()
  console.log('🌱 Tables seeded')
}

seedTables()

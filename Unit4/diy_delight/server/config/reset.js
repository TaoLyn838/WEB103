import './dotenv.js'
import customItemTable from './customItemTable.js'
import userCarsTable from './userCarsTable.js'
import categoriesTable from './categoriesTable.js'

const resetTables = async () => {
  // PostgreSQL Connection
  // await categoriesTable.seedCategoriesTable()
  // await customItemTable.seedCustomItemTable()
  // await userCarsTable.seedUserCarsTable()
  // MongoDB Connection
  await categoriesTable.seedCategoriesTableMongo()
  await customItemTable.seedCustomItemTableMongo()
  await userCarsTable.seedUserCarsTableMongo()
  console.log('🌱 Tables seeded')
  process.exit(0)
}

resetTables()

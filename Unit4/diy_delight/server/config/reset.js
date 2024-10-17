import './dotenv.js'
import customItemTable from './customItemTable.js'
import userCarsTable from './userCarsTable.js'
import categoriesTable from './categoriesTable.js'

const resetTables = async () => {
  await categoriesTable.seedCategoriesTable()
  await customItemTable.seedCustomItemTable()
  await userCarsTable.seedUserCarsTable()
  console.log('🌱 Tables seeded')
}

resetTables()

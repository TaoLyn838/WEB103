import { connectToDatabase, getDatabase } from './database.js' // Use import instead of require
;(async () => {
  try {
    // Connect to the database
    await connectToDatabase()

    // Access the database instance
    const db = getDatabase()

    // Test database functionality (e.g., list collections)
    const collections = await db.listCollections().toArray()
    console.log('Collections:', collections)
  } catch (err) {
    console.error('Error during database test:', err)
  } finally {
    process.exit(0) // Exit script when done
  }
})()

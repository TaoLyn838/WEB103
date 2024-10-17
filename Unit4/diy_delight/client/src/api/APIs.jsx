// custom items controller
const fetchCustomItems = async () => {
  try {
    const response = await fetch('/api/customItems')

    if (!response.ok) {
      throw new Error('Failed to fetch custom items')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

const fetchCustomItemById = async (itemId) => {
  try {
    const response = await fetch(`/api/customItems/${itemId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch custom item with ID: ${itemId}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

const fetchCustomItemId = async (categoryId, name) => {
  try {
    const response = await fetch(
      `/api/customItems?category_id=${categoryId}&name=${encodeURIComponent(
        name
      )}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch custom item ID for: ${name}`)
    }
    const data = await response.json()
    return data.id
  } catch (error) {
    throw error
  }
}

// custom cars controller
const fetchCustomCars = async () => {
  try {
    const response = await fetch('/api/customCars')

    if (!response.ok) {
      throw new Error('Failed to fetch custom cars')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

const fetchCustomCarById = async (carId) => {
  try {
    const response = await fetch(`/api/customCars/${carId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch custom car with ID: ${carId}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

const createCustomCar = async (newCarData) => {
  try {
    const response = await fetch('/api/customCars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCarData),
    })
    if (!response.ok) {
      throw new Error('Failed to create car')
    }
  } catch (error) {
    console.error('Error creating car:', error)
    throw error
  }
}

const updateCustomCarById = async (carId, updatedCarData) => {
  try {
    const response = await fetch(`/api/customCars/${carId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCarData),
    })
    if (!response.ok) {
      throw new Error('Failed to update car')
    }
  } catch (error) {
    console.error('Error updating car:', error)
    throw error
  }
}

const deleteCustomCarById = async (carId) => {
  try {
    const response = await fetch(`/api/customCars/${carId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete car')
    }
  } catch (error) {
    console.error('Error deleting car:', error)
    throw error
  }
}

// categories controller
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = response.json()
    return data
  } catch (error) {
    throw error
  }
}

export default {
  fetchCustomCars,
  fetchCustomCarById,
  fetchCategories,
  fetchCustomItems,
  fetchCustomItemId,
  fetchCustomItemById,
  createCustomCar,
  updateCustomCarById,
  deleteCustomCarById,
}

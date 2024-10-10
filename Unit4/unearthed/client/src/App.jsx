import './App.css'
import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Gifts from './pages/Gifts.jsx'
import GiftDetails from './pages/GiftDetails.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import { Link } from 'react-router-dom'
import CreateGift from './pages/CreateGift.jsx'
import EditGift from './pages/EditGift.jsx'

const App = () => {
  const [gifts, setGifts] = useState([])

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('/gifts')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setGifts(data)
      } catch (error) {
        console.error('Failed to fetch gifts:', error)
      }
    }
    fetchGifts()
  }, [])

  // Sets up routes
  let element = useRoutes([
    {
      path: '/',
      element: <Gifts data={gifts} />,
    },
    {
      path: '/gift/:id',
      element: <GiftDetails data={gifts} />,
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
    {
      path: '/new',
      element: <CreateGift />,
    },
    {
      path: '/edit/:id',
      element: <EditGift />,
    },
  ])

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/logo.png" />
            <h1>UnEarthed</h1>
          </div>
          <div className="header-right">
            <Link to="/">
              <button className="homeBtn">Home</button>
            </Link>
            <Link to="/new">
              <button className="addBtn">Add Gift</button>
            </Link>
          </div>
        </div>
      </header>

      {element}
    </div>
  )
}

export default App

import { Box, Divider, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import ProcessPage from '../src/pages/Process'
import { StrictMode } from 'react'
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  
    const handleLogin = () => {
      // In a real-world app, you would authenticate the user here (e.g., through an API)
      setIsAuthenticated(true)
    }
  
    return (
      <StrictMode>
        <BrowserRouter>
          <Routes>
            {/* Login page */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
              }
            />
            {/* Protect Home route, only accessible if authenticated */}
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/" />}
            />
            <Route path="/process" element={<ProcessPage />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    )
  }

export default App

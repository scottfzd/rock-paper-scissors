import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GameInterface from './pages/GameInterface';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<GameInterface />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

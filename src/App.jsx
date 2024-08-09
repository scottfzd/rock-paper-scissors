import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GameInterface from './pages/GameInterface';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<GameInterface />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

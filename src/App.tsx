import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import HeroPage from './pages/HeroPage'
import PracticePage from './pages/PracticePage'
import { useState } from 'react'

import './App.css'

function App() {

  const [charName, setCharName] = useState<"Knight" | "Archer" | "Mage" | "Rogue">("Knight");

  const getCharName = (name: "Knight" | "Archer" | "Mage" | "Rogue") => {
    setCharName(name);
  }

  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HeroPage getCharName={getCharName} />}></Route>
          <Route path='/Practice' element={<PracticePage charName={charName} />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

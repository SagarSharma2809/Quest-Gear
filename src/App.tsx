import Navbar from './Components/Navbar'
import HeroSection from './Sections/HeroSection'
import PracticeSection from './Sections/PracticeSection'
import { useState } from 'react'

import './App.css'

function App() {

  const [charName, setCharName] = useState<"Knight" | "Archer" | "Mage" | "Rogue">("Knight");

  const getCharName = (name: "Knight" | "Archer" | "Mage" | "Rogue") => {
    setCharName(name);
  }

  return (
    <>
      <Navbar />
      <HeroSection getCharName={getCharName} />
      <PracticeSection charName={charName} />
    </>
  )
}

export default App

import Navbar from './Components/Navbar'
import HeroSection from './Sections/HeroSection'
import PracticeSection from './Sections/PracticeSection'
import { useState } from 'react'

import './App.css'

function App() {

  const [charName, setCharName] = useState<string>("Knight");

  const getCharName = (name: string) => {
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

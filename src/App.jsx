import Navbar from './Components/Navbar'
import HeroSection from './Sections/HeroSection'
import PracticeSection from './Sections/PracticeSection'
import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  const [charName, setCharName] = useState("Knight");

  const getCharName = (name) => {
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

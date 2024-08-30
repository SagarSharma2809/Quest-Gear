import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import HeroPage from './pages/HeroPage'
import PracticePage from './pages/PracticePage'


import './App.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HeroPage />}></Route>
          <Route path='/Practice/:characterName' element={<PracticePage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

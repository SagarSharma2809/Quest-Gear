import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import HeroPage from './pages/HeroPage'
import PracticePage from './pages/PracticePage'
import SignUp from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'


import './App.css'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HeroPage />}></Route>
          <Route path='/Practice/:characterName' element={<PracticePage />}></Route>
          <Route path='/signUp' element={<SignUpPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

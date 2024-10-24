import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './Components/Navbar'
import HeroPage from './pages/HeroPage'
import PracticePage from './pages/PracticePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'



function App() {
  return (
    <Router>
      <Main />
    </Router>
  )
}

function Main() {

  const location = useLocation();
  return (
    <>


      {location.pathname !== '/signup' && location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path='/signup' element={<AuthPage />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/' element={<HeroPage />} />
        <Route path='/Practice/:characterName' element={<PracticePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/search" element={<Restaurants/>}></Route>
    </Routes>
  )
}

export default App

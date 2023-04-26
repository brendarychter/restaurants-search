import './App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search/>}></Route>
    </Routes>
  )
}

export default App

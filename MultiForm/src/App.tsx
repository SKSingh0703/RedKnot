
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Personal from './Pages/Personal'
import Education from './Pages/Education'
import Projects from './Pages/Projects'
import Login from './Pages/Login'
import Thanks from './Pages/Thanks'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/education" element={<Education />} />
      <Route path="/project" element={<Projects />} />
      <Route path="/end" element={<Thanks />} />
    </Routes>
  )
}

export default App

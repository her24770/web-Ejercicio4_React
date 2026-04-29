import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listado from './pages/Listado'
import Detalle from './pages/Detalle'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Listado />} />
        <Route path="/items/:id" element={<Detalle />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import { Link } from 'react-router-dom'
import { useMusic } from '../context/MusicContext'

function Navbar() {
  const { tema, toggleTema } = useMusic()

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/items">Listado</Link>
      <button onClick={toggleTema}>
        {tema === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </nav>
  )
}

export default Navbar

import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { useMusic } from '../context/MusicContext'
import Icon from './Icon'

function Navbar() {
  const { tema, toggleTema } = useMusic()
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <span className="navbar__logo">♪ MusicApp</span>
      <ul className="navbar__links">
        <li>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>
            <Icon name="home" size={15} /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/items" className={pathname.startsWith('/items') ? 'active' : ''}>
            <Icon name="music" size={15} /> Canciones
          </Link>
        </li>
      </ul>
      <div className="navbar__right">
        <button className="theme-toggle" onClick={toggleTema} title="Cambiar tema">
          {tema === 'dark' ? <Icon name="sun" size={16} /> : <Icon name="moon" size={16} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

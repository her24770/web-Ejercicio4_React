import { useState, useEffect } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import CardCancion from '../components/CardCancion'
import CardArtista from '../components/CardArtista'
import Icon from '../components/Icon'
import { getTopSongs } from '../services/itunesService'
import { ARTISTAS_DESTACADOS } from '../data/featuredArtists'

function msToDuracion(ms) {
  if (!ms) return ''
  const total = Math.floor(Number(ms) / 1000)
  const min = Math.floor(total / 60)
  const seg = String(total % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function Home() {
  const [canciones, setCanciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTopSongs()
      .then(entries => {
        const songs = entries.map(entry => ({
          portada:   entry['im:image'][2].label,
          nombre:    entry['im:name'].label,
          artista:   entry['im:artist'].label,
          artistaId: entry['im:artist'].attributes.href.split('/').pop(),
          duracion:  msToDuracion(entry['im:duration']?.label),
        }))
        setCanciones(songs)
      })
      .catch(() => setError('No se pudieron cargar las canciones. Intenta de nuevo.'))
      .finally(() => setCargando(false))
  }, [])

  return (
    <div className="home container">
      <div className="home__hero">
        <div className="home__hero-label">Bienvenido a</div>
        <h1 className="home__hero-title">Tu música,<br />tu mundo.</h1>
        <button className="btn-primary" onClick={() => navigate('/items')}>
          <Icon name="music" size={15} /> Explorar canciones
        </button>
      </div>

      <div className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">🔥 Top Canciones</h2>
          <Link to="/items" className="home__section-link">Ver todas →</Link>
        </div>

        {cargando && (
          <p style={{ color: 'var(--text-muted)', padding: 'var(--space-lg) 0' }}>Cargando...</p>
        )}
        {error && (
          <div className="empty-state">
            <div className="empty-state__icon"><Icon name="alertCircle" size={40} /></div>
            <div className="empty-state__text">{error}</div>
          </div>
        )}
        {!cargando && !error && (
          <div className="canciones-grid">
            {canciones.slice(0, 8).map((cancion, i) => (
              <CardCancion key={i} {...cancion} />
            ))}
          </div>
        )}
      </div>

      <div className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Artistas destacados</h2>
        </div>
        <div className="artistas-grid">
          {ARTISTAS_DESTACADOS.map(artista => (
            <CardArtista key={artista.artistaId} {...artista} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

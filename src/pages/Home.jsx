import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardCancion from '../components/CardCancion'
import Icon from '../components/Icon'
import { getTopSongs, getTopArtists, getArtistTopSong } from '../services/itunesService'
import './Home.css'

function msToDuracion(ms) {
  if (!ms) return ''
  const total = Math.floor(Number(ms) / 1000)
  const min = Math.floor(total / 60)
  const seg = String(total % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function Home() {
  const [canciones, setCanciones] = useState([])
  const [artistas, setArtistas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [loadingArtistId, setLoadingArtistId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getTopSongs(), getTopArtists()])
      .then(([songEntries, artistEntries]) => {
        setCanciones(songEntries.map(entry => ({
          portada:  entry['im:image'][2].label,
          nombre:   entry['im:name'].label,
          artista:  entry['im:artist'].label,
          trackId:  entry['id']?.attributes?.['im:id'],
          duracion: msToDuracion(entry['im:duration']?.label),
        })))
        setArtistas(artistEntries.map((entry, i) => ({
          rank:      i + 1,
          artistaId: entry['id']?.attributes?.['im:id'],
          nombre:    entry['im:name'].label,
          genero:    entry['category']?.attributes?.term || 'Música',
          foto:      entry['im:image']?.[2]?.label || null,
        })))
      })
      .catch(() => setError('No se pudieron cargar los datos.'))
      .finally(() => setCargando(false))
  }, [])

  const handleArtistClick = async (artistaId) => {
    setLoadingArtistId(artistaId)
    const song = await getArtistTopSong(artistaId).catch(() => null)
    setLoadingArtistId(null)
    if (song) navigate(`/items/${song.trackId}`)
  }

  return (
    <div className="home container">

      <div className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Top artistas</h2>
        </div>
        {cargando && <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>}
        {!cargando && !error && (
          <div className="artistas-tabla">
            {artistas.map(a => (
              <button
                key={a.artistaId}
                className="artistas-tabla__fila"
                onClick={() => handleArtistClick(a.artistaId)}
                disabled={loadingArtistId === a.artistaId}
              >
                <span className="artistas-tabla__num">{a.rank}</span>
                <div className="artistas-tabla__avatar">
                  {a.foto
                    ? <img src={a.foto} alt={a.nombre} />
                    : <Icon name="users" size={20} />
                  }
                </div>
                <div className="artistas-tabla__info">
                  <span className="artistas-tabla__nombre">{a.nombre}</span>
                  <span className="artistas-tabla__genero">{a.genero}</span>
                </div>
                <span className="artistas-tabla__accion">
                  {loadingArtistId === a.artistaId
                    ? '...'
                    : <Icon name="play" size={14} />
                  }
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Top actualmente</h2>
          <Link to="/items" className="home__section-link">Ver todas →</Link>
        </div>
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

    </div>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardCancion from '../components/CardCancion'
import Icon from '../components/Icon'
import { getTopSongs } from '../services/itunesService'
import './Home.css'

function msToDuracion(ms) {
  if (!ms) return ''
  const total = Math.floor(Number(ms) / 1000)
  const min = Math.floor(total / 60)
  const seg = String(total % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function extraerArtistas(entries) {
  const vistos = new Set()
  const artistas = []
  entries.forEach(entry => {
    const nombre = entry['im:artist'].label
    if (!vistos.has(nombre)) {
      vistos.add(nombre)
      artistas.push({
        rank:    artistas.length + 1,
        nombre,
        trackId: entry['id']?.attributes?.['im:id'],
        foto:    entry['im:image']?.[2]?.label || null,
        itemData: {
          artworkUrl100: entry['im:image']?.[2]?.label || null,
          trackName:     entry['im:name']?.label,
          artistName:    entry['im:artist']?.label,
        },
      })
    }
  })
  return artistas.slice(0, 10)
}

function Home() {
  const [canciones, setCanciones] = useState([])
  const [artistas, setArtistas] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getTopSongs()
      .then(entries => {
        setCanciones(entries.map(entry => ({
          portada:  entry['im:image'][2].label,
          nombre:   entry['im:name'].label,
          artista:  entry['im:artist'].label,
          trackId:  entry['id']?.attributes?.['im:id'],
          duracion: msToDuracion(entry['im:duration']?.label),
          itemData: {
            artworkUrl100: entry['im:image'][2].label,
            trackName:     entry['im:name'].label,
            artistName:    entry['im:artist'].label,
          },
        })))
        setArtistas(extraerArtistas(entries))
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <div className="home container">

      <div className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Top artistas</h2>
        </div>
        {cargando && <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>}
        {!cargando && (
          <div className="artistas-tabla">
            {artistas.map(a => (
              <button
                key={a.nombre}
                className="artistas-tabla__fila"
                onClick={() => navigate(`/items/${a.trackId}`, { state: { itemData: a.itemData } })}
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
                </div>
                <span className="artistas-tabla__accion">
                  <Icon name="play" size={14} />
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
        {!cargando && (
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

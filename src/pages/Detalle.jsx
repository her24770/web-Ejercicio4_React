import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { lookupById } from '../services/itunesService'
import './Detalle.css'

function msToDuracion(ms) {
  if (!ms) return ''
  const total = Math.floor(Number(ms) / 1000)
  const min = Math.floor(total / 60)
  const seg = String(total % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function Detalle() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    lookupById(id)
      .then(result => setItem(result))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>
    </div>
  )

  if (!item) return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <p style={{ color: 'var(--text-muted)' }}>No se encontró la canción.</p>
    </div>
  )

  return (
    <div className="detalle-cancion container">
      <div style={{ padding: 'var(--space-lg) 0 0' }}>
        <Link to="/items" className="btn-ghost">
          <Icon name="arrowLeft" size={15} /> Volver
        </Link>
      </div>
      <div className="detalle-cancion__layout">
        <div className="detalle-cancion__cover-wrap">
          {item.artworkUrl100
            ? <img
                className="detalle-cancion__cover"
                src={item.artworkUrl100.replace('100x100', '400x400')}
                alt={item.trackName}
              />
            : <div className="detalle-cancion__cover--placeholder">
                <Icon name="music" size={64} />
              </div>
          }
        </div>
        <div className="detalle-cancion__info">
          <span className="detalle-cancion__tipo">Canción</span>
          <h1 className="detalle-cancion__titulo">{item.trackName}</h1>
          <p className="detalle-cancion__artista">{item.artistName}</p>
          <p className="detalle-cancion__album">{item.collectionName}</p>
          {item.trackTimeMillis && (
            <p className="detalle-cancion__duracion">
              {msToDuracion(item.trackTimeMillis)}
            </p>
          )}
          {item.primaryGenreName && (
            <span className="detalle__genero">{item.primaryGenreName}</span>
          )}
          {item.previewUrl && (
            <div className="detalle-cancion__preview">
              <p className="detalle-cancion__preview-label">Vista previa (30 seg)</p>
              <audio controls src={item.previewUrl} className="detalle-cancion__audio">
                Tu navegador no soporta audio.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Detalle

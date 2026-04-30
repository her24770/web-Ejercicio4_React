import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CardCancion from '../components/CardCancion'
import Buscador from '../components/Buscador'
import Icon from '../components/Icon'
import { getTopSongs, searchMusic } from '../services/itunesService'
import './Listado.css'

function msToDuracion(ms) {
  if (!ms) return ''
  const total = Math.floor(Number(ms) / 1000)
  const min = Math.floor(total / 60)
  const seg = String(total % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function mapTopSong(entry) {
  return {
    portada:  entry['im:image'][2].label,
    nombre:   entry['im:name'].label,
    artista:  entry['im:artist'].label,
    trackId:  entry['id']?.attributes?.['im:id'],
    duracion: msToDuracion(entry['im:duration']?.label),
  }
}

function mapSearchResult(result) {
  return {
    portada:  result.artworkUrl100,
    nombre:   result.trackName,
    artista:  result.artistName,
    trackId:  String(result.trackId),
    duracion: msToDuracion(result.trackTimeMillis),
    preview:  result.previewUrl,
  }
}

function Listado() {
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState([])
  const [topSongs, setTopSongs] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getTopSongs()
      .then(entries => {
        const songs = entries.map(mapTopSong)
        setTopSongs(songs)
        setResultados(songs)
      })
      .finally(() => setCargando(false))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResultados(topSongs)
      return
    }

    const timer = setTimeout(() => {
      setCargando(true)
      searchMusic(query)
        .then(results => setResultados(results.map(mapSearchResult)))
        .finally(() => setCargando(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query, topSongs])

  const handleAleatorio = () => {
    if (resultados.length === 0) return
    const random = resultados[Math.floor(Math.random() * resultados.length)]
    navigate(`/items/${random.trackId}`)
  }

  return (
    <div className="listado container">
      <div className="listado__header">
        <h2 className="listado__title">Canciones</h2>
        <div className="listado__toolbar">
          <Buscador value={query} onChange={setQuery} />
          <button className="btn-aleatorio" onClick={handleAleatorio}>
            <Icon name="shuffle" size={15} /> Aleatorio
          </button>
        </div>
      </div>

      <p className="listado__resultados-count">
        {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
      </p>

      {cargando && (
        <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>
      )}

      {!cargando && resultados.length > 0 && (
        <div className="canciones-grid">
          {resultados.map((cancion, i) => (
            <CardCancion key={i} {...cancion} />
          ))}
        </div>
      )}

      {!cargando && resultados.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon"><Icon name="music" size={40} /></div>
          <div className="empty-state__text">No se encontraron canciones</div>
        </div>
      )}
    </div>
  )
}

export default Listado

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { searchYouTubeVideo } from '../services/itunesService'
import './YouTubePlayer.css'

function YouTubePlayer({ nombre, artista }) {
  const [videoId, setVideoId] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!nombre || !artista) return
    setCargando(true)
    searchYouTubeVideo(nombre, artista)
      .then(id => setVideoId(id))
      .catch(() => setVideoId(null))
      .finally(() => setCargando(false))
  }, [nombre, artista])

  if (cargando) return (
    <div className="youtube-player youtube-player--loading">
      <p>Buscando video...</p>
    </div>
  )

  if (!videoId) return null

  return (
    <div className="youtube-player">
      <iframe
        className="youtube-player__iframe"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={`${nombre} - ${artista}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

YouTubePlayer.propTypes = {
  nombre:  PropTypes.string.isRequired,
  artista: PropTypes.string.isRequired,
}

export default YouTubePlayer

import PropTypes from 'prop-types'
import './CardCancion.css'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

function CardCancion({ portada, nombre, artista, trackId, duracion, preview, itemData }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (trackId) navigate(`/items/${trackId}`, { state: itemData ? { itemData } : undefined })
  }

  const handlePlay = (e) => {
    e.stopPropagation()
    // ReproductorPreview se implementa en el paso 7
  }

  return (
    <div className="card-cancion" onClick={handleClick}>
      {portada
        ? <img className="card-cancion__cover" src={portada} alt={nombre} />
        : (
          <div className="card-cancion__cover--placeholder">
            <Icon name="music" size={32} />
          </div>
        )
      }
      <div className="card-cancion__body">
        <div className="card-cancion__titulo">{nombre}</div>
        <div className="card-cancion__artista">{artista}</div>
        <div className="card-cancion__footer">
          <span className="card-cancion__duracion">{duracion}</span>
          <button className="card-cancion__play" onClick={handlePlay} aria-label="Reproducir">
            <Icon name="play" size={10} />
          </button>
        </div>
      </div>
    </div>
  )
}

CardCancion.propTypes = {
  portada:   PropTypes.string,
  nombre:    PropTypes.string.isRequired,
  artista:   PropTypes.string.isRequired,
  trackId:   PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duracion:  PropTypes.string,
  preview:   PropTypes.string,
  itemData:  PropTypes.object,
}

export default CardCancion

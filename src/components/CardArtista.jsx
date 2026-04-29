import PropTypes from 'prop-types'
import './CardArtista.css'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

function CardArtista({ foto, nombre, genero, artistaId }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (artistaId) navigate(`/items/${artistaId}`)
  }

  return (
    <div className="card-artista" onClick={handleClick}>
      {foto
        ? <img className="card-artista__foto" src={foto} alt={nombre} />
        : (
          <div className="card-artista__foto--placeholder">
            <Icon name="users" size={32} />
          </div>
        )
      }
      <div className="card-artista__nombre">{nombre}</div>
      <span className="card-artista__genero">{genero}</span>
    </div>
  )
}

CardArtista.propTypes = {
  foto:      PropTypes.string,
  nombre:    PropTypes.string.isRequired,
  genero:    PropTypes.string.isRequired,
  artistaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CardArtista

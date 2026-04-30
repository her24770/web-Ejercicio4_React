import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h2 className="not-found__titulo">Página no encontrada</h2>
      <p className="not-found__mensaje">
        La canción que buscas no existe o fue eliminada.
      </p>
      <Link to="/" className="not-found__btn">
        <Icon name="home" size={15} /> Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound

import PropTypes from 'prop-types'
import './Buscador.css'
import Icon from './Icon'

function Buscador({ value, onChange, placeholder = 'Buscar canciones, artistas...' }) {
  return (
    <div className="buscador">
      <span className="buscador__icon">
        <Icon name="search" size={16} />
      </span>
      <input
        className="buscador__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

Buscador.propTypes = {
  value:       PropTypes.string.isRequired,
  onChange:    PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default Buscador

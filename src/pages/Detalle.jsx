import { useParams } from 'react-router-dom'
import './Detalle.css'

function Detalle() {
  const { id } = useParams()
  return <h1>Detalle del artista: {id}</h1>
}

export default Detalle

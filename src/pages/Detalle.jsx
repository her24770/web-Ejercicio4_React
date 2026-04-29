import { useParams } from 'react-router-dom'

function Detalle() {
  const { id } = useParams()
  return <h1>Detalle del artista: {id}</h1>
}

export default Detalle

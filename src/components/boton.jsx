function Boton({ contenido, onClick, type = 'button' }) {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {contenido}
    </button>
  )
}

export default Boton

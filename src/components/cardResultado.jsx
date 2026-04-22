function CardResultado({ pokemon }) {
  if (!pokemon) {
    return null
  }

  return (
    <article className="card-pokemon">
      <h3>{pokemon.nombre} #{pokemon.id}</h3>
      <img src={pokemon.imagen} alt={pokemon.nombre} />
      <p>
        <strong>Tipos:</strong> {pokemon.tipos.join(', ')}
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.peso}
      </p>
      <p>
        <strong>Altura:</strong> {pokemon.altura}
      </p>
    </article>
  )
}

export default CardResultado

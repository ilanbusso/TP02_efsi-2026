const BASE_URL = 'https://pokeapi.co/api/v2'

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error('No se encontró el recurso solicitado.')
  }

  return response.json()
}

function normalizarPokemon(data) {
  return {
    id: data.id,
    nombre: data.name,
    imagen:
      data.sprites?.other?.['official-artwork']?.front_default ||
      data.sprites?.front_default ||
      '',
    tipos: data.types?.map((item) => item.type.name) || [],
    peso: data.weight,
    altura: data.height,
  }
}

export async function buscarPokemonPorNombre(nombre) {
  const data = await request(`/pokemon/${nombre.toLowerCase().trim()}`)
  return normalizarPokemon(data)
}

export async function buscarPokemonPorId(id) {
  const data = await request(`/pokemon/${id}`)
  return normalizarPokemon(data)
}

export async function obtenerListaPokemones(limit = 20) {
  const data = await request(`/pokemon?limit=${limit}`)

  const detalles = await Promise.all(
    data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json())),
  )

  return detalles.map(normalizarPokemon)
}

export async function obtenerTipoPokemon(tipo) {
  const data = await request(`/type/${tipo.toLowerCase().trim()}`)
  return data.pokemon.map((item) => item.pokemon.name)
}

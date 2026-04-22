import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Titulo from './components/Titulos'
import Subtitulo from './components/subtitulos'
import InputText from './components/inputTxt'
import InputNum from './components/inputNum'
import Boton from './components/boton'
import CardResultado from './components/cardResultado'
import {
  buscarPokemonPorId,
  buscarPokemonPorNombre,
  obtenerListaPokemones,
  obtenerTipoPokemon,
} from './services/API'

function App() {
  const [nombre, setNombre] = useState('')
  const [id, setId] = useState('')
  const [pokemonResultado, setPokemonResultado] = useState(null)
  const [listaPokemones, setListaPokemones] = useState([])
  const [filtroNombre, setFiltroNombre] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [tipoResultado, setTipoResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarListaFija()
  }, [])

  async function cargarListaFija() {
    try {
      setLoading(true)
      setError('')
      const data = await obtenerListaPokemones(30, 0)
      setListaPokemones(data)
    } catch {
      setError('No se pudo cargar la lista fija de Pokémon.')
    } finally {
      setLoading(false)
    }
  }

  async function manejarBusquedaPorNombre(event) {
    event.preventDefault()

    if (!nombre.trim()) {
      setError('Ingresá un nombre para buscar.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await buscarPokemonPorNombre(nombre)
      setPokemonResultado(data)
    } catch {
      setPokemonResultado(null)
      setError('No existe un Pokémon con ese nombre.')
    } finally {
      setLoading(false)
    }
  }

  async function manejarBusquedaPorId(event) {
    event.preventDefault()

    if (!id.trim()) {
      setError('Ingresá un ID para buscar.')
      return
    }

    if (!/^\d+$/.test(id) || Number(id) <= 0) {
      setError('El ID debe ser un número entero mayor a 0.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await buscarPokemonPorId(id)
      setPokemonResultado(data)
    } catch {
      setPokemonResultado(null)
      setError('No existe un Pokémon con ese ID.')
    } finally {
      setLoading(false)
    }
  }

  async function manejarBusquedaTipo(event) {
    event.preventDefault()

    if (!tipoBusqueda.trim()) {
      setTipoResultado(null)
      setError('Ingresá un tipo para buscar.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await obtenerTipoPokemon(tipoBusqueda)
      setTipoResultado(data)
    } catch {
      setTipoResultado(null)
      setError('No existe ese tipo de Pokémon.')
    } finally {
      setLoading(false)
    }
  }

  async function probarErrorIntencional() {
    try {
      setLoading(true)
      setError('')
      await buscarPokemonPorNombre('pokemon-que-no-existe-123456')
    } catch {
      setPokemonResultado(null)
      setError('Error intencional: el recurso solicitado no existe.')
    } finally {
      setLoading(false)
    }
  }

  const listaFiltrada = useMemo(() => {
    return listaPokemones.filter((pokemon) =>
      pokemon.nombre.toLowerCase().includes(filtroNombre.toLowerCase()),
    )
  }, [filtroNombre, listaPokemones])

  return (
    <main className="app">
      <Titulo contenido="Mini Pokédex Web" />

      <section className="panel">
        <Subtitulo contenido="Búsqueda individual" />

        <form onSubmit={manejarBusquedaPorNombre} className="fila">
          <InputText
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Buscar por nombre (ej: pikachu)"
          />
          <Boton type="submit" contenido="Buscar nombre" />
        </form>

        <form onSubmit={manejarBusquedaPorId} className="fila">
          <InputNum
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Buscar por ID (ej: 25)"
          />
          <Boton type="submit" contenido="Buscar ID" />
        </form>

        <div className="fila">
          <Boton contenido="Probar error intencional" onClick={probarErrorIntencional} />
        </div>

        {pokemonResultado && <CardResultado pokemon={pokemonResultado} />}
      </section>

      <section className="panel">
        <Subtitulo contenido="Lista fija: primeros 30 Pokémon" />

        <div className="fila">
          <InputText
            value={filtroNombre}
            onChange={(event) => setFiltroNombre(event.target.value)}
            placeholder="Filtrar esta lista por nombre"
          />
        </div>

        <div className="lista-grid">
          {listaFiltrada.map((pokemon) => (
            <CardResultado key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </section>

      <section className="panel">
        <Subtitulo contenido="Búsqueda por tipo" />

        <form onSubmit={manejarBusquedaTipo} className="fila">
          <InputText
            value={tipoBusqueda}
            onChange={(event) => setTipoBusqueda(event.target.value)}
            placeholder="Buscar tipo (ej: fire, water, grass)"
          />
          <Boton type="submit" contenido="Buscar tipo" />
        </form>

        {tipoResultado && (
          <div className="tipo-resultado">
            <p>
              <strong>Tipo:</strong> {tipoResultado.nombre}
            </p>
            <p>
              <strong>Generación:</strong> {tipoResultado.generacion}
            </p>
            <p>
              <strong>Cantidad de Pokémon:</strong> {tipoResultado.cantidadPokemon}
            </p>
            <p>
              <strong>Movimientos asociados:</strong> {tipoResultado.movimientos}
            </p>

            <h3>Pokémon asociados</h3>
            <ul className="tipo-lista">
              {tipoResultado.pokemones.map((nombrePokemon) => (
                <li key={nombrePokemon}>{nombrePokemon}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {loading && <p className="estado">Cargando...</p>}
      {error && <p className="estado error">{error}</p>}
    </main>
  )
}

export default App

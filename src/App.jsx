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
  const [filtroTipo, setFiltroTipo] = useState('')
  const [nombresPorTipo, setNombresPorTipo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarLista()
  }, [])

  async function cargarLista() {
    try {
      setLoading(true)
      setError('')
      const data = await obtenerListaPokemones(20)
      setListaPokemones(data)
    } catch {
      setError('No se pudo cargar la lista inicial de Pokémon.')
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

  async function manejarFiltroTipo() {
    if (!filtroTipo.trim()) {
      setNombresPorTipo(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      const nombres = await obtenerTipoPokemon(filtroTipo)
      setNombresPorTipo(nombres)
    } catch {
      setNombresPorTipo([])
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
    return listaPokemones.filter((pokemon) => {
      const coincideNombre = pokemon.nombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase())
      const coincideTipo =
        !nombresPorTipo || nombresPorTipo.includes(pokemon.nombre.toLowerCase())

      return coincideNombre && coincideTipo
    })
  }, [filtroNombre, listaPokemones, nombresPorTipo])

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
        <Subtitulo contenido="Lista limitada y filtros" />

        <div className="fila">
          <InputText
            value={filtroNombre}
            onChange={(event) => setFiltroNombre(event.target.value)}
            placeholder="Filtrar lista por nombre"
          />
        </div>

        <div className="fila">
          <InputText
            value={filtroTipo}
            onChange={(event) => setFiltroTipo(event.target.value)}
            placeholder="Filtrar por tipo (ej: fire, water)"
          />
          <Boton contenido="Aplicar tipo" onClick={manejarFiltroTipo} />
        </div>

        <div className="lista-grid">
          {listaFiltrada.map((pokemon) => (
            <CardResultado key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </section>

      {loading && <p className="estado">Cargando...</p>}
      {error && <p className="estado error">{error}</p>}
    </main>
  )
}

export default App

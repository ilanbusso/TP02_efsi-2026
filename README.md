# TP02 - Mini Pokédex Web (React)

Aplicación web simple hecha con **React + JSX + CSS + JavaScript** para consumir la API pública de Pokémon: [https://pokeapi.co/](https://pokeapi.co/).

El objetivo del trabajo es practicar consumo de APIs REST con `fetch`, manejo de estados en React, renderizado dinámico de datos JSON y manejo de errores.

## Funcionalidades implementadas

- Búsqueda de Pokémon por **nombre**.
- Búsqueda de Pokémon por **ID**.
- Visualización de datos principales:
  - nombre
  - imagen
  - tipo(s)
  - peso
  - altura
- Carga de **lista limitada** de Pokémon (20).
- Filtro de la lista por:
  - nombre
  - tipo
- Botón para **error intencional** (recurso inexistente).
- Indicador de **loading** durante las peticiones.
- Validaciones básicas de inputs (vacío, ID numérico mayor a 0).

## Endpoints de PokéAPI utilizados

- `GET /api/v2/pokemon/{name}` → búsqueda por nombre.
- `GET /api/v2/pokemon/{id}` → búsqueda por ID.
- `GET /api/v2/pokemon?limit=20` → lista limitada.
- `GET /api/v2/type/{type}` → obtener los Pokémon de un tipo para filtrar.
- Error intencional usando nombre inexistente: `pokemon-que-no-existe-123456`.

Base URL: `https://pokeapi.co/api/v2`

## Estructura del proyecto

```text
src/
  App.jsx                 # Contenedor principal y lógica de UI
  App.css                 # Estilos principales
  index.css               # Estilos globales
  services/
    API.js                # Funciones centralizadas de acceso a la API
  components/
    Titulos.jsx
    Titulos.css
    subtitulos.jsx
    subtitulos.css
    inputTxt.jsx
    inputTxt.css
    inputNum.jsx
    boton.jsx
    cardResultado.jsx
```

## Decisiones de implementación

- Se centralizó el consumo de la API en `src/services/API.js` para mantener el código organizado.
- Se normalizaron los datos del Pokémon en un solo formato antes de enviarlos a los componentes.
- Se usó componentización simple, sin fragmentar de más.
- Se aplicaron hooks (`useState`, `useEffect`, `useMemo`) solo para estado, carga inicial y filtrado de lista.

## Dificultades encontradas

- Algunos archivos iniciales tenían estructura incompleta o imports incorrectos, se corrigieron de forma mínima.
- El endpoint de lista devuelve URLs de detalle, por eso se realizó una segunda carga para completar datos de cards.
- Se priorizó una solución académica y clara sobre una implementación avanzada.

## Ejecución

```bash
npm install
npm run dev
```

Luego abrir la URL local que muestra Vite (normalmente `http://localhost:5173`).

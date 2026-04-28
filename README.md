#TP02 - Mini Pokédex Web (React)

Esta es una app web simple hecha con **React + JSX + CSS + JavaScript** usando la API pública de Pokémon: [https://pokeapi.co/](https://pokeapi.co/).

La idea del trabajo fue practicar cómo pedir datos con `fetch`, manejar estados en React, mostrar info que viene en JSON y controlar errores para que no se rompa todo.

## Funcionalidades implementadas

- Buscar Pokémon por **nombre**.
- Buscar Pokémon por **ID**.
- Mostrar datos principales:
  - nombre
  - imagen
  - tipo(s)
  - peso
  - altura
- Cargar una **lista limitada** de Pokémon (20).
- Filtrar la lista por:
  - nombre
  - tipo
- Botón para provocar un **error intencional** (recurso inexistente).
- Mostrar indicador de **loading** mientras se hacen las peticiones.
- Validaciones básicas de inputs (vacío, ID numérico mayor a 0).

## Endpoints de PokéAPI utilizados

Estas son las consultas que usa la app, explicado simple:

- `GET /api/v2/pokemon/{name}` → para buscar un Pokémon por nombre.
- `GET /api/v2/pokemon/{id}` → para buscar un Pokémon por número (ID).
- `GET /api/v2/pokemon?limit=20` → para traer una lista corta de Pokémon.
- `GET /api/v2/type/{type}` → para traer Pokémon de un tipo y poder filtrar.
- Error intencional usando nombre inexistente: `pokemon-que-no-existe-123456`.

Base URL: `https://pokeapi.co/api/v2`

## Estructura del proyecto

```text
src/
  App.jsx                 # Componente principal con la lógica general de la pantalla
  App.css                 # Estilos principales
  index.css               # Estilos globales
  services/
    API.js                # Funciones para hacer las consultas a la API en un solo lugar
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

En general está dividido en un archivo principal (`App.jsx`), componentes chicos para reutilizar partes de la interfaz y un archivo de servicio (`API.js`) para no mezclar todo.

## Decisiones de implementación

- Puse todo el consumo de API en `src/services/API.js` para que no quede desordenado.
- Antes de mostrar datos, los acomodé en un formato único para que los componentes reciban siempre lo mismo.
- Traté de separar en componentes, pero sin exagerar y crear archivos de más.
- Usé hooks (`useState`, `useEffect`, `useMemo`) solo para lo necesario: estado, carga inicial y filtros.

## Dificultades encontradas

- Al principio había archivos con estructura incompleta o imports mal puestos, así que fui corrigiendo lo mínimo para que funcione.
- Con `fetch` no siempre salía bien todo de una, y tuve que revisar respuestas para evitar errores raros.
- La lista inicial trae URLs de detalle, no todos los datos listos, entonces hubo que hacer una segunda carga para completar las cards.
- También tuve que manejar casos donde algo no existe (por ejemplo en la búsqueda), porque si no se rompía la vista.
- La idea fue mantener una solución clara y de nivel académico, sin meter cosas avanzadas que no eran necesarias para este TP.

## Ejecución

```bash
npm install
npm run dev
```

Después abrí la URL local que muestra Vite (normalmente `http://localhost:5173`).

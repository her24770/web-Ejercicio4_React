# MusicApp — Mini-blog de música

Mini-blog de música construido con Vite + React + React Router v6, conectado a la iTunes Search API y YouTube Data API v3.

**Nivel apuntado: Senior (100 pts)**

---

## Instrucciones para correr el proyecto

### Opcion 1 — Docker (recomendado)

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd web-Ejercicio4_React

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu YouTube API key

# 3. Levantar con Docker Compose
docker compose up -d
```

La app estará disponible en `http://localhost:3000`

---

### Opcion 2 — Local con Node

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd web-Ejercicio4_React

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu YouTube API key

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## Variables de entorno

Crear un archivo `.env` basado en `.env.example`:

| Variable | Descripción |
|---|---|
| `VITE_YOUTUBE_API_KEY` | API key de YouTube Data API v3 |

Para obtener una key: [Google Cloud Console](https://console.cloud.google.com) > Activar YouTube Data API v3 > Crear credencial.

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home — top artistas y top canciones actuales |
| `/items` | Listado — búsqueda de canciones con filtro en tiempo real |
| `/items/:id` | Detalle — información de la canción, preview de audio y video de YouTube |
| `/404` | Página no encontrada |
| `*` | Redirige a `/404` |

---

## Componentes reutilizables

### CardCancion

Tarjeta que muestra la información de una canción. Al hacer click navega al detalle.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `nombre` | string | Si | Nombre de la canción |
| `artista` | string | Si | Nombre del artista |
| `portada` | string | No | URL de la portada del álbum |
| `trackId` | string / number | No | ID de iTunes para navegar al detalle |
| `duracion` | string | No | Duración formateada (ej. "3:45") |
| `preview` | string | No | URL del audio preview de 30 seg |

---

### Buscador

Input de búsqueda controlado con ícono integrado.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `value` | string | Si | Valor actual del input |
| `onChange` | function | Si | Callback que recibe el nuevo valor |
| `placeholder` | string | No | Texto placeholder (default: "Buscar canciones, artistas...") |

---

### YouTubePlayer

Busca y muestra el video oficial de una canción usando YouTube Data API v3.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `nombre` | string | Si | Nombre de la canción |
| `artista` | string | Si | Nombre del artista |

---

### Icon

Componente de íconos SVG inline reutilizables.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `name` | string | Si | Nombre del ícono: `home`, `music`, `search`, `play`, `shuffle`, `sun`, `moon`, `users`, `arrowLeft`, `alertCircle` |
| `size` | number | No | Tamaño en píxeles (default: 18) |

---

## Tecnologías

- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) — sin API key
- [YouTube Data API v3](https://developers.google.com/youtube/v3)

---

## Requisitos cumplidos

**Base**
- Proyecto generado con `npm create vite@latest`
- React Router DOM v6
- Rutas: `/`, `/items`, `/items/:id`, `/404`
- Datos en `src/services/itunesService.js`, no hardcodeados en componentes
- `useParams` en la pagina de detalle
- Navegacion con `Link`, sin etiquetas `<a>`

**Mid**
- Pagina 404 para rutas no encontradas
- Busqueda con filtro en tiempo real en el listado
- Boton aleatorio con `useNavigate`
- Componentes reutilizables con props documentadas

**Senior**
- Estado global con Context API (tema claro/oscuro persistido en localStorage)
- 4 componentes con PropTypes definidos: `CardCancion`, `Buscador`, `YouTubePlayer`, `Icon`
- Consumo de API externa: iTunes Search API + YouTube Data API v3

# Ejercicio 4: React

Escojan un tema que les apasione (videojuegos, películas, recetas, Pokémon, bandas, etc) y construyan un mini-blog con Vite + React + React Router.

## Requerimientos base

- Proyecto generado con `npm create vite@latest`
- Usar `react-router-dom` v6
- Mínimo 3 rutas: home `/`, listado `/items`, detalle `/items/:id`
- Los datos deben vivir en un espacio separado, no hardcodeados dentro de los componentes
- Usar `useParams` en la página de detalle
- Navegación con `<Link>`, no con `<a>`
- Repo público en GitHub con `README.md` que incluya instrucciones para correr el proyecto
- Video subido al repo (en carpeta `/demo`) mostrando las 3 rutas funcionando

## Niveles

Los niveles no son rangos de nota, es una decisión que toman antes de empezar. Deben declarar en su `README.md` a qué nivel están apuntando.

| Nivel  | Puntos | Requerimientos                                                                                                                                 |
|--------|--------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Junior | 70     | Requerimientos base completos. Funciona y se puede clonar.                                                                                     |
| Mid    | 85     | Todo lo de Junior + al menos 3 de los siguientes: <br> - Página 404 para rutas no encontradas <br> - Búsqueda o filtro en el listado <br> - Botón "elemento aleatorio" usando `useNavigate` <br> - Componente reutilizable con props documentadas en el README |
| Senior | 100    | Todo lo de Mid + los 3 siguientes: <br> 1. Estado global con Context API (ej. tema claro/oscuro, favoritos, carrito) <br> 2. Al menos 3 componentes con PropTypes definidos <br> 3. Implementar una base de datos (sqlite, mysql, postgresql, consumo de api) |

## Descuentos automáticos

- Uso de `<a>` → **−20 pts** c/u
- Sin README o README vacío → **−50 pts**
- Sin video → **−15 pts**
- Datos hardcodeados dentro de los componentes → **−50 pts**
- Commitear el `node_modules` → **−200 pts**
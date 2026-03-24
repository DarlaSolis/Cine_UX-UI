import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_URL, PELICULAS, FILTROS } from "../Peliculas.config"

const GENEROS_MAP = {
  28:"Acción", 12:"Aventura", 16:"Animación", 35:"Comedia", 80:"Crimen",
  99:"Documental", 18:"Drama", 10751:"Familia", 14:"Fantasía", 36:"Historia",
  27:"Terror", 10402:"Música", 9648:"Misterio", 10749:"Romance",
  878:"Ciencia ficción", 53:"Suspenso", 10752:"Bélica", 37:"Western"
}

function mapear(data, seccion) {
  return {
    id:       data.id,
    title:    data.title,
    image:    data.poster_path
      ? `${TMDB_IMAGE_URL}${data.poster_path}`
      : "https://fakeimg.pl/500x750/0d1e35/F9B21A?text=Sin+Poster",
    year:     data.release_date?.substring(0, 4) || "—",
    genre:    data.genre_ids?.length ? GENEROS_MAP[data.genre_ids[0]] || "Película" : "Película",
    sinopsis: data.overview || "Sin descripción disponible.",
    rating:   data.vote_average?.toFixed(1) || "—",
    seccion,
  }
}

function Cartelera({ onComprar, onToggleFavorito, esFavorito }) {
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading]     = useState(true)
  const [filtroActivo, setFiltro] = useState(null)   // null = "Todos"
  const [busqueda, setBusqueda]   = useState("")
  const [orden, setOrden]         = useState("defecto")

  useEffect(() => {
    if (TMDB_API_KEY === "AQUI_TU_API_KEY") { setLoading(false); return }

    Promise.all(
      PELICULAS.map(({ id, seccion }) =>
        fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=es-MX`)
          .then(r => r.json())
          .then(data => mapear(data, seccion))
          .catch(() => null)
      )
    ).then(resultados => {
      setPeliculas(resultados.filter(Boolean))
      setLoading(false)
    })
  }, [])

  // Filtra por SECCIÓN del config (no por género de TMDB) + búsqueda por nombre
  let listado = peliculas.filter(p => {
    const matchSeccion = filtroActivo === null || p.seccion === filtroActivo
    const matchBusq    = p.title.toLowerCase().includes(busqueda.toLowerCase())
    return matchSeccion && matchBusq
  })

  if (orden === "az")     listado = [...listado].sort((a,b) => a.title.localeCompare(b.title))
  if (orden === "za")     listado = [...listado].sort((a,b) => b.title.localeCompare(a.title))
  if (orden === "año")    listado = [...listado].sort((a,b) => b.year - a.year)
  if (orden === "rating") listado = [...listado].sort((a,b) => b.rating - a.rating)

  // Botones de filtro generados desde FILTROS del config
  const botonesFiltro = [
    { key: null, label: "Todos" },
    ...Object.entries(FILTROS).map(([key, label]) => ({ key, label }))
  ]

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="page-hero">
        <span className="eyebrow">🎬 Cartelera completa</span>
        <h1>Funciones disponibles</h1>
        <p>{loading ? "Cargando..." : `${peliculas.length} películas · Cinépolis`}</p>
      </div>

      <div className="main-content">

        {/* Búsqueda + orden */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"18px" }}>
          <div style={{ position:"relative", flex:"1", minWidth:"200px" }}>
            <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)" }}>🔍</span>
            <input
              className="dark-input"
              type="text"
              placeholder="Buscar película por nombre..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ paddingLeft:"42px" }}
            />
          </div>
          <select
            className="dark-input"
            value={orden}
            onChange={e => setOrden(e.target.value)}
            style={{ width:"auto", minWidth:"180px", cursor:"pointer", background:"rgba(255,255,255,0.06)" }}
          >
            <option value="defecto">Orden por defecto</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="año">Más recientes</option>
            <option value="rating">Mejor valoradas</option>
          </select>
        </div>

        {/* Filtros de sección — leen de FILTROS en Peliculas.config.js */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" }}>
          {botonesFiltro.map(({ key, label }) => (
            <button
              key={String(key)}
              onClick={() => setFiltro(key)}
              style={{
                padding:"7px 16px", borderRadius:"20px", cursor:"pointer",
                background: filtroActivo===key ? "linear-gradient(135deg,#F9B21A,#FF9B00)" : "rgba(255,255,255,0.05)",
                color: filtroActivo===key ? "#1a1200" : "rgba(255,255,255,0.6)",
                border: filtroActivo===key ? "none" : "1px solid rgba(255,255,255,0.1)",
                fontFamily:"'Montserrat',sans-serif", fontWeight:"700",
                fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.4px",
                transition:"all 0.2s"
              }}
            >{label}</button>
          ))}
        </div>

        {!loading && (
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.82rem", marginBottom:"20px", fontFamily:"'Open Sans',sans-serif" }}>
            {listado.length} película{listado.length !== 1 ? "s" : ""} encontrada{listado.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Skeletons */}
        {loading && (
          <div className="grid-container">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ borderRadius:"16px", overflow:"hidden", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ height:"320px", background:"linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
                <div style={{ padding:"14px" }}>
                  <div style={{ height:"16px", borderRadius:"8px", background:"rgba(255,255,255,0.06)", marginBottom:"10px", width:"70%" }} />
                  <div style={{ height:"11px", borderRadius:"6px", background:"rgba(255,255,255,0.04)", width:"45%" }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && listado.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 0", color:"rgba(255,255,255,0.2)" }}>
            <div style={{ fontSize:"3.5rem", marginBottom:"16px" }}>🎬</div>
            <p style={{ fontFamily:"'Open Sans',sans-serif", marginBottom:"16px" }}>
              Sin resultados para tu búsqueda
            </p>
            <button
              onClick={() => { setBusqueda(""); setFiltro(null) }}
              className="btn-outline"
              style={{ fontSize:"0.85rem" }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Grid — MovieCard ya no recibe onVerDetalle, usa useNavigate internamente */}
        {!loading && listado.length > 0 && (
          <div className="grid-container">
            {listado.map((p, i) => (
              <div key={p.id} className={`movie-card delay-${(i % 6) + 1}`}>
                <MovieCard
                  title={p.title}
                  image={p.image}
                  year={p.year}
                  genre={p.genre}
                  sinopsis={p.sinopsis}
                  rating={p.rating}
                  onComprar={() => onComprar(p)}
                  onToggleFavorito={onToggleFavorito}
                  esFavorito={esFavorito(p.title)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cartelera
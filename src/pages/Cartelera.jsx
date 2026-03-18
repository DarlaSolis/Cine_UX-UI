import { useState } from "react"
import MovieCard from "../components/MovieCard"

const cartelera = [
  { id:1, title:"Carol",                                image:"https://m.media-amazon.com/images/I/91s7+krYovL._AC_UF1000,1000_QL80_.jpg", year:"2015", genre:"Drama/Romance",       sinopsis:"Un aspirante a fotógrafa desarrolla una relación íntima con una mujer mayor en la década de 1950 en Nueva York." },
  { id:2, title:"Bob Esponja: Al Rescate",              image:"https://m.media-amazon.com/images/M/MV5BNjAyZDQwOTktZjc0Yi00MzNjLWI1NmUtODI2ZjJmYWRjOTA3XkEyXkFqcGc@._V1_.jpg", year:"2024", genre:"Animación/Comedia",  sinopsis:"Bob Esponja y Patricio se embarcan en una aventura épica para rescatar a Gary." },
  { id:3, title:"Super Mario Bros.: La película",       image:"https://m.media-amazon.com/images/I/91zqGNzwk5L._AC_SY879_.jpg",                                                   year:"2023", genre:"Animación/Aventura", sinopsis:"Mario y Luigi son transportados a un mundo mágico donde deberán luchar contra Bowser." },
  { id:4, title:"Enredados",                            image:"https://es.web.img3.acsta.net/medias/nmedia/18/79/96/30/19541005.jpg",                                              year:"2010", genre:"Animación",         sinopsis:"Rapunzel escapa de su torre con la ayuda de Flynn Rider para descubrir el mundo exterior." },
]

const FILTROS = ["Todos", "Animación", "Acción", "Comedia", "Aventura"]

function Cartelera({ onVerDetalle, onComprar, onToggleFavorito, esFavorito }) {
  const [filtroActivo, setFiltroActivo] = useState("Todos")
  const [busqueda, setBusqueda]         = useState("")

  const peliculasFiltradas = cartelera.filter(p => {
    const matchFiltro  = filtroActivo === "Todos" || p.genre.includes(filtroActivo)
    const matchBusqued = p.title.toLowerCase().includes(busqueda.toLowerCase())
    return matchFiltro && matchBusqued
  })

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="page-hero">
        <span className="eyebrow">🎬 Cartelera</span>
        <h1>Funciones disponibles</h1>
        <p>Selecciona tu película favorita y compra tus boletos</p>
      </div>

      <div className="main-content">
        {/* Búsqueda + filtros */}
        <div style={{ marginBottom: "28px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>🔍</span>
            <input
              className="dark-input"
              type="text"
              placeholder="Buscar película..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ paddingLeft: "42px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {FILTROS.map(f => (
              <button
                key={f}
                onClick={() => setFiltroActivo(f)}
                style={{
                  padding: "8px 18px", borderRadius: "20px",
                  background: filtroActivo === f ? "linear-gradient(135deg,#F9B21A,#FF9B00)" : "rgba(255,255,255,0.06)",
                  color: filtroActivo === f ? "#1a1200" : "rgba(255,255,255,0.65)",
                  border: filtroActivo === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "700", fontSize: "0.8rem",
                  textTransform: "uppercase", letterSpacing: "0.5px",
                  transition: "all 0.2s ease"
                }}
              >{f}</button>
            ))}
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginBottom: "20px", fontFamily: "'Open Sans', sans-serif" }}>
          {peliculasFiltradas.length} película{peliculasFiltradas.length !== 1 ? "s" : ""} encontrada{peliculasFiltradas.length !== 1 ? "s" : ""}
        </p>

        {peliculasFiltradas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.25)" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🎬</div>
            <p style={{ fontFamily: "'Open Sans', sans-serif" }}>Sin resultados para tu búsqueda</p>
          </div>
        ) : (
          <div className="grid-container">
            {peliculasFiltradas.map((pelicula, i) => (
              <div key={pelicula.id} className={`movie-card delay-${(i % 6) + 1}`}>
                <MovieCard
                  title={pelicula.title}
                  image={pelicula.image}
                  year={pelicula.year}
                  genre={pelicula.genre}
                  sinopsis={pelicula.sinopsis}
                  onVerDetalle={() => onVerDetalle(pelicula)}
                  onComprar={() => onComprar(pelicula)}
                  onToggleFavorito={onToggleFavorito}
                  esFavorito={esFavorito(pelicula.title)}
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
import { useState } from "react"

// Interacción dinámica #1: mostrar/ocultar sinopsis (useState local)
// Interacción dinámica #2: favorito reflejado desde estado GLOBAL via prop esFavorito
function Favoritos({ pelicula, onToggleFavorito, esFavorito }) {
  const [mostrarSinopsis, setMostrarSinopsis] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "7px" }}>

        {/* onClick: toggle sinopsis */}
        <button
          onClick={() => setMostrarSinopsis(p => !p)}
          style={{
            flex: 1, padding: "7px 8px", borderRadius: "8px",
            background: mostrarSinopsis ? "rgba(12,93,140,0.3)" : "rgba(255,255,255,0.05)",
            border: mostrarSinopsis ? "1px solid rgba(12,93,140,0.6)" : "1px solid rgba(255,255,255,0.1)",
            color: mostrarSinopsis ? "#5bb8f5" : "rgba(255,255,255,0.45)",
            cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700", fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.4px",
            transition: "all 0.2s"
          }}
        >{mostrarSinopsis ? "▲ Ocultar" : "▼ Sinopsis"}</button>

        {/* onClick: toggleFavorito — el estado viene del padre (global) */}
        <button
          onClick={() => onToggleFavorito(pelicula)}
          style={{
            flex: 1, padding: "7px 8px", borderRadius: "8px",
            background: esFavorito ? "rgba(54,245,175,0.12)" : "rgba(255,255,255,0.05)",
            border: esFavorito ? "1px solid rgba(54,245,175,0.4)" : "1px solid rgba(255,255,255,0.1)",
            color: esFavorito ? "#36F5AF" : "rgba(255,255,255,0.45)",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700", fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.4px",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)"
          }}
          onMouseEnter={e => {
            if (!esFavorito) {
              e.currentTarget.style.borderColor = "rgba(54,245,175,0.3)"
              e.currentTarget.style.color = "rgba(54,245,175,0.65)"
            }
          }}
          onMouseLeave={e => {
            if (!esFavorito) {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              e.currentTarget.style.color = "rgba(255,255,255,0.45)"
            }
          }}
        >
          {esFavorito ? "✓ Guardada" : "❤️ Favorito"}
        </button>
      </div>

      {/* Sinopsis desplegable */}
      {mostrarSinopsis && (
        <div style={{
          padding: "10px 12px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "8px",
          borderLeft: "3px solid #F9B21A",
          animation: "fadeIn 0.25s ease"
        }}>
          <p style={{
            margin: 0, color: "rgba(255,255,255,0.6)",
            fontSize: "0.82rem", lineHeight: "1.6",
            fontFamily: "'Open Sans', sans-serif"
          }}>
            {pelicula.sinopsis || "Sin descripción disponible."}
          </p>
        </div>
      )}
    </div>
  )
}

export default Favoritos
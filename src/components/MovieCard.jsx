import { useState } from "react"
import Favoritos from "./Favoritos"

function MovieCard({ title, image, onVerDetalle, year, genre, sinopsis, onToggleFavorito, onComprar, esFavorito }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px", overflow: "hidden",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(249,178,26,0.35)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.2)",
        display: "flex", flexDirection: "column"
      }}
    >
      {/* Imagen con overlay */}
      <div
        onClick={onVerDetalle}
        style={{ position: "relative", paddingTop: "148%", overflow: "hidden", cursor: "pointer", flexShrink: 0 }}
      >
        <img
          src={image} alt={title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)"
          }}
        />
        {/* Gradiente inferior */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to top, rgba(10,22,40,0.92) 0%, transparent 100%)"
        }} />

        {/* Chips año/género */}
        <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {year  && <span style={{ background: "rgba(9,79,138,0.9)",  color: "white",   padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600", fontFamily: "'Montserrat', sans-serif", backdropFilter: "blur(4px)" }}>{year}</span>}
          {genre && <span style={{ background: "rgba(249,178,26,0.9)", color: "#1a1200", padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "700", fontFamily: "'Montserrat', sans-serif", backdropFilter: "blur(4px)" }}>{genre}</span>}
        </div>

        {/* Badge de favorito guardado — se muestra/oculta con el estado global */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: esFavorito ? "rgba(54,245,175,0.92)" : "rgba(0,0,0,0.45)",
          borderRadius: "50%", width: "30px", height: "30px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.9rem",
          boxShadow: esFavorito ? "0 2px 10px rgba(54,245,175,0.5)" : "none",
          border: esFavorito ? "none" : "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(4px)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: esFavorito ? "scale(1)" : "scale(0.85)",
          opacity: esFavorito ? 1 : 0.5,
          cursor: "pointer",
          zIndex: 2
        }}
          onClick={e => { e.stopPropagation(); onToggleFavorito({ title, image, year, genre, sinopsis }) }}
        >
          {esFavorito ? "❤️" : "🤍"}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <h3
          onClick={onVerDetalle}
          style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "800", fontSize: "0.95rem", lineHeight: "1.3", margin: 0, cursor: "pointer" }}
        >{title}</h3>

        {/* Sinopsis toggle + botón favorito — usa estado global */}
        <Favoritos
          pelicula={{ title, image, year, genre, sinopsis }}
          onToggleFavorito={onToggleFavorito}
          esFavorito={esFavorito}
        />

        {/* Comprar */}
        <button
          onClick={onComprar}
          style={{
            width: "100%", padding: "10px", borderRadius: "10px",
            background: "linear-gradient(135deg, #F9B21A, #FF9B00)",
            color: "#1a1200", border: "none", cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontWeight: "800",
            fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.8px",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(249,178,26,0.4)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
        >🎫 Comprar boletos</button>

        {/* Ver detalle */}
        <button
          onClick={onVerDetalle}
          style={{
            width: "100%", padding: "9px", borderRadius: "10px",
            background: "transparent", color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontWeight: "600",
            fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.5px",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)" }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)" }}
        >Ver detalle →</button>
      </div>
    </div>
  )
}

export default MovieCard
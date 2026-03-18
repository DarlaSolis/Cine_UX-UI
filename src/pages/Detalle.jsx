import { useState } from "react"

function Detalle({ pelicula, cambiarVista, onComprar }) {
  const p = pelicula || {
    title: "Película no encontrada",
    image: "https://fakeimg.pl/800x600/0a1628/F9B21A?text=Cinepolis&font=montserrat",
    year: "2024", genre: "Género", sinopsis: "Sinopsis no disponible."
  }

  // useState: selección de horario (interacción dinámica)
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)
  const [formatoSeleccionado, setFormatoSeleccionado] = useState("2D")

  const horarios = ["14:00", "16:30", "18:30", "20:30", "22:15"]
  const formatos = ["2D", "3D", "IMAX", "4DX", "VIP"]

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* Hero backdrop con imagen */}
      <div style={{
        position: "relative", height: "340px", overflow: "hidden",
        background: "linear-gradient(135deg, #0f2040, #1a3a6b)"
      }}>
        <img
          src={p.image} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "blur(8px)", transform: "scale(1.05)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)" }} />

        {/* Botón volver */}
        <button
          onClick={() => cambiarVista("cartelera")}
          style={{
            position: "absolute", top: "24px", left: "28px",
            padding: "9px 20px", borderRadius: "25px",
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white", cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
            fontSize: "0.85rem", transition: "all 0.2s", zIndex: 2
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >← Volver</button>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: "1100px", margin: "-180px auto 0", padding: "0 28px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }}>

          {/* Poster */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={p.image} alt={p.title}
              style={{
                width: "100%", borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                border: "3px solid rgba(249,178,26,0.4)"
              }}
            />
          </div>

          {/* Info */}
          <div style={{ paddingTop: "140px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              <Chip color="#F9B21A" text={p.year} dark />
              <Chip color="#094F8A" text={p.genre} dark />
            </div>

            <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: "900", marginBottom: "16px", letterSpacing: "-0.5px", lineHeight: "1.2" }}>
              {p.title}
            </h1>

            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8", fontSize: "1rem", marginBottom: "32px", fontFamily: "'Open Sans', sans-serif", maxWidth: "600px" }}>
              {p.sinopsis}
            </p>

            {/* Selección de formato — onClick: selección activa */}
            <div style={{ marginBottom: "24px" }}>
              <p className="dark-label" style={{ marginBottom: "10px" }}>Formato</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {formatos.map(f => (
                  <button
                    key={f}
                    onClick={() => setFormatoSeleccionado(f)}
                    style={{
                      padding: "8px 18px", borderRadius: "10px",
                      background: formatoSeleccionado === f ? "rgba(249,178,26,0.2)" : "rgba(255,255,255,0.05)",
                      border: formatoSeleccionado === f ? "2px solid #F9B21A" : "1px solid rgba(255,255,255,0.1)",
                      color: formatoSeleccionado === f ? "#F9B21A" : "rgba(255,255,255,0.5)",
                      cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "700", fontSize: "0.82rem", transition: "all 0.2s"
                    }}
                  >{f}</button>
                ))}
              </div>
            </div>

            {/* Selección de horario — onClick: selección activa */}
            <div style={{ marginBottom: "32px" }}>
              <p className="dark-label" style={{ marginBottom: "10px" }}>Horario</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {horarios.map(h => (
                  <button
                    key={h}
                    onClick={() => setHorarioSeleccionado(h)}
                    style={{
                      padding: "10px 20px", borderRadius: "10px",
                      background: horarioSeleccionado === h ? "linear-gradient(135deg,#36F5AF,#2ed9a0)" : "rgba(255,255,255,0.05)",
                      border: horarioSeleccionado === h ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: horarioSeleccionado === h ? "#0a3d2b" : "rgba(255,255,255,0.6)",
                      cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "800", fontSize: "0.9rem", transition: "all 0.2s",
                      boxShadow: horarioSeleccionado === h ? "0 4px 14px rgba(54,245,175,0.35)" : "none"
                    }}
                  >{h} hrs</button>
                ))}
              </div>
              {horarioSeleccionado && (
                <p style={{ marginTop: "10px", color: "#36F5AF", fontSize: "0.85rem", fontFamily: "'Open Sans', sans-serif" }}>
                  ✓ Función seleccionada: <strong>{horarioSeleccionado} hrs</strong> — Formato <strong>{formatoSeleccionado}</strong>
                </p>
              )}
            </div>

            {/* Botones */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                onClick={() => onComprar && onComprar({ ...p, horario: horarioSeleccionado || "20:30", formato: formatoSeleccionado })}
                style={{ flex: 1, minWidth: "180px", fontSize: "1rem", padding: "14px 24px" }}
              >
                🎫 Comprar boletos
              </button>
              <button
                className="btn-outline"
                style={{ flex: 1, minWidth: "160px", fontSize: "1rem", padding: "14px 24px" }}
              >
                ▶ Ver trailer
              </button>
            </div>

            {/* Asientos disponibles */}
            <div style={{
              marginTop: "20px", padding: "14px 18px",
              background: "rgba(54,245,175,0.07)", borderRadius: "12px",
              border: "1px solid rgba(54,245,175,0.2)",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#36F5AF", flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.88rem" }}>
                Asientos disponibles para la función de hoy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Chip({ color, text, dark }) {
  return (
    <span style={{
      padding: "5px 14px", borderRadius: "20px",
      background: dark ? `${color}22` : color,
      color: dark ? color : "#fff",
      border: dark ? `1px solid ${color}55` : "none",
      fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "0.8rem"
    }}>{text}</span>
  )
}

export default Detalle
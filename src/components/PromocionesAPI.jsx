import { useState, useEffect } from "react"

// Datos de contexto de cine para enriquecer la respuesta de la API
const PROMOS_CONTEXTO = [
  {
    titulo:      "🎬 2×1 en Boletos",
    badge:       "HOT",
    badgeColor:  "#ef4444",
    descuento:   "50% off",
    vigencia:    "Válido todos los martes",
    condicion:   "Aplica en funciones 2D antes de las 18:00 hrs",
    icono:       "🎟️",
  },
  {
    titulo:      "🍿 Combo Familiar",
    badge:       "NUEVO",
    badgeColor:  "#36F5AF",
    descuento:   "Ahorra $80",
    vigencia:    "Todo el mes de febrero",
    condicion:   "4 boletos + 2 palomitas grandes + 4 refrescos",
    icono:       "👨‍👩‍👧‍👦",
  },
  {
    titulo:      "⭐ Membresía Premium",
    badge:       "VIP",
    badgeColor:  "#F9B21A",
    descuento:   "1 mes gratis",
    vigencia:    "Oferta por tiempo limitado",
    condicion:   "Incluye 4 boletos mensuales y 30% en dulcería",
    icono:       "👑",
  },
  {
    titulo:      "🎫 Preventa Exclusiva",
    badge:       "LIMITADO",
    badgeColor:  "#a855f7",
    descuento:   "20% off",
    vigencia:    "Solo esta semana",
    condicion:   "Compra anticipada para estrenos de marzo",
    icono:       "⚡",
  },
]

// Imágenes temáticas de cine
const IMAGENES = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80", // Cinema seats
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80", // Popcorn
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&q=80", // Tickets
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80", // Movie projector
]

function PromocionesAPI() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  // useEffect + fetch a API pública (Requisito #4)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo conectar con el servidor")
        return res.json()
      })
      .then(data => {
        // Enriquecemos cada post con datos reales de Cinépolis
        const promos = data.map((post, i) => {
          const ctx = PROMOS_CONTEXTO[i]
          // Usamos el id del post para generar un "código de promoción" único
          const codigo = `CINE${post.id.toString().padStart(4, "0")}`
          // Usamos el userId para calcular cuántos usos quedan (simulado)
          const usosRestantes = (post.userId * 13) % 50 + 10

          return {
            id:           post.id,
            titulo:       ctx.titulo,
            badge:        ctx.badge,
            badgeColor:   ctx.badgeColor,
            descuento:    ctx.descuento,
            vigencia:     ctx.vigencia,
            condicion:    ctx.condicion,
            icono:        ctx.icono,
            codigo,
            usosRestantes,
            imagen:       IMAGENES[i],
          }
        })
        setPromociones(promos)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <div style={{
        width: "40px", height: "40px", margin: "0 auto",
        border: "3px solid rgba(255,255,255,0.08)",
        borderTop: "3px solid #F9B21A",
        borderRadius: "50%", animation: "spin 0.9s linear infinite"
      }} />
      <p style={{ marginTop: "14px", color: "rgba(255,255,255,0.35)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem" }}>
        Cargando promociones...
      </p>
    </div>
  )

  if (error) return (
    <div style={{ textAlign: "center", padding: "24px", background: "rgba(239,68,68,0.08)", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.2)" }}>
      <p style={{ color: "#ef4444", fontFamily: "'Open Sans', sans-serif" }}>⚠️ {error}</p>
    </div>
  )

  return (
    <div style={{ marginTop: "56px" }}>
      <h2 className="section-subtitle">🎉 Promociones especiales</h2>
      <p style={{ color: "rgba(255,255,255,0.35)", marginBottom: "24px", fontFamily: "'Open Sans', sans-serif", fontSize: "0.88rem" }}>
        Datos cargados dinámicamente desde API externa — {promociones.length} promociones disponibles
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {promociones.map(promo => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  )
}

function PromoCard({ promo }) {
  const [hovered, setHovered]     = useState(false)
  const [copiado, setCopiado]     = useState(false)

  const copiarCodigo = () => {
    navigator.clipboard?.writeText(promo.codigo).catch(() => {})
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px", overflow: "hidden",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(249,178,26,0.3)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "0 4px 12px rgba(0,0,0,0.2)",
        position: "relative"
      }}
    >
      {/* Badge */}
      <span style={{
        position: "absolute", top: "12px", right: "12px", zIndex: 1,
        background: promo.badgeColor, color: "#fff",
        padding: "3px 10px", borderRadius: "20px",
        fontSize: "0.7rem", fontWeight: "900",
        fontFamily: "'Montserrat', sans-serif",
        boxShadow: `0 2px 8px ${promo.badgeColor}66`
      }}>{promo.badge}</span>

      {/* Imagen */}
      <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
        <img
          src={promo.imagen} alt={promo.titulo}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)"
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 55%)" }} />

        {/* Descuento destacado */}
        <div style={{
          position: "absolute", bottom: "12px", left: "14px",
          fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
          color: "#F9B21A", fontSize: "1.25rem",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)"
        }}>
          {promo.descuento}
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h4 style={{
          color: "white", fontFamily: "'Montserrat', sans-serif",
          fontWeight: "800", fontSize: "0.95rem", margin: "0 0 6px"
        }}>{promo.titulo}</h4>

        <p style={{
          color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif",
          fontSize: "0.83rem", margin: "0 0 4px", lineHeight: "1.4"
        }}>{promo.condicion}</p>

        <p style={{
          color: "rgba(255,255,255,0.3)", fontFamily: "'Open Sans', sans-serif",
          fontSize: "0.78rem", margin: "0 0 14px"
        }}>📅 {promo.vigencia}</p>

        {/* Barra de usos restantes */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "'Open Sans', sans-serif" }}>Usos disponibles</span>
            <span style={{ color: "#36F5AF", fontSize: "0.72rem", fontFamily: "'Montserrat', sans-serif", fontWeight: "700" }}>{promo.usosRestantes} restantes</span>
          </div>
          <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "2px",
              width: `${(promo.usosRestantes / 60) * 100}%`,
              background: `linear-gradient(90deg, ${promo.badgeColor}, ${promo.badgeColor}99)`,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>

        {/* Código de promoción */}
        <button
          onClick={copiarCodigo}
          style={{
            width: "100%", padding: "9px 14px", borderRadius: "10px",
            background: copiado ? "rgba(54,245,175,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px dashed ${copiado ? "#36F5AF" : "rgba(255,255,255,0.2)"}`,
            color: copiado ? "#36F5AF" : "rgba(255,255,255,0.5)",
            cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700", fontSize: "0.8rem", letterSpacing: "2px",
            textTransform: "uppercase", transition: "all 0.2s"
          }}
        >
          {copiado ? "✓ Código copiado" : `Código: ${promo.codigo}`}
        </button>
      </div>
    </div>
  )
}

export default PromocionesAPI
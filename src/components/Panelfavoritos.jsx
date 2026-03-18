import { useEffect, useState } from "react"

function PanelFavoritos({ favoritos, onEliminar, onCerrar }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const cerrar = () => { setVisible(false); setTimeout(onCerrar, 350) }

  return (
    <>
      <div onClick={cerrar} style={{ position: "fixed", inset: 0, zIndex: 1500, background: "rgba(10,22,40,0.75)", backdropFilter: "blur(4px)", opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1600, width: "min(420px, 100vw)", background: "#0d1e35", border: "1px solid rgba(249,178,26,0.1)", display: "flex", flexDirection: "column", transform: visible ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)", boxShadow: "-8px 0 50px rgba(0,0,0,0.5)" }}>

        <div style={{ background: "linear-gradient(135deg, #212E5C, #094F8A)", padding: "22px 20px", borderBottom: "3px solid #F9B21A", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ color: "white", margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: "900", fontSize: "1.25rem" }}>❤️ Mis Favoritos</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", margin: "4px 0 0", fontSize: "0.82rem", fontFamily: "'Open Sans', sans-serif" }}>
              {favoritos.length === 0 ? "Sin favoritos aún" : `${favoritos.length} película${favoritos.length>1?"s":""} guardada${favoritos.length>1?"s":""}`}
            </p>
          </div>
          <button onClick={cerrar} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "36px", height: "36px", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
          >✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {favoritos.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "14px", padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "3.5rem", opacity: 0.2 }}>🎬</div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.95rem", margin: 0 }}>Agrega películas a favoritos para verlas aquí</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {favoritos.map((p, i) => <FavCard key={p.favId} pelicula={p} onEliminar={onEliminar} delay={i*60} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function FavCard({ pelicula, onEliminar, delay }) {
  const [in_, setIn] = useState(false)
  const [saliendo, setSaliendo] = useState(false)
  useEffect(() => { setTimeout(() => setIn(true), delay) }, [delay])
  const handleEliminar = () => { setSaliendo(true); setTimeout(() => onEliminar(pelicula.favId), 300) }

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s ease", opacity: saliendo ? 0 : in_ ? 1 : 0, transform: saliendo ? "translateX(40px)" : in_ ? "translateX(0)" : "translateX(16px)" }}>
      <img src={pelicula.image} alt={pelicula.title} style={{ width: "46px", height: "64px", objectFit: "cover", borderRadius: "7px", flexShrink: 0, border: "2px solid rgba(249,178,26,0.35)" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: "700", color: "white", fontSize: "0.88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pelicula.title}</h4>
        <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
          {pelicula.year && <span style={{ background: "rgba(9,79,138,0.7)", color: "white", padding: "2px 8px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", fontFamily: "'Montserrat', sans-serif" }}>{pelicula.year}</span>}
          {pelicula.genre && <span style={{ background: "rgba(249,178,26,0.2)", color: "#F9B21A", padding: "2px 8px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", fontFamily: "'Montserrat', sans-serif" }}>{pelicula.genre}</span>}
        </div>
      </div>
      <button onClick={handleEliminar} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", padding: "6px 8px", cursor: "pointer", color: "#ef4444", fontSize: "0.78rem", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", flexShrink: 0, transition: "all 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.25)"}
        onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.1)"}
      >✕ Quitar</button>
    </div>
  )
}

export default PanelFavoritos
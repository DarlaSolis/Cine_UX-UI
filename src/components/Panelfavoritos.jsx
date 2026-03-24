import { useEffect, useState } from "react"

function PanelFavoritos({ favoritos, onEliminar, onCerrar, onVerDetalle }) {
  const [visible, setVisible]         = useState(false)
  const [expandido, setExpandido]     = useState(null) // id de la tarjeta expandida
  const [buscando, setBuscando]       = useState("")

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const cerrar = () => { setVisible(false); setTimeout(onCerrar, 350) }

  const favoritosFiltrados = favoritos.filter(f =>
    f.title.toLowerCase().includes(buscando.toLowerCase())
  )

  return (
    <>
      {/* Backdrop */}
      <div onClick={cerrar} style={{ position:"fixed", inset:0, zIndex:1500, background:"rgba(10,22,40,0.75)", backdropFilter:"blur(4px)", opacity: visible?1:0, transition:"opacity 0.35s" }} />

      {/* Panel */}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, zIndex:1600, width:"min(440px,100vw)", background:"#0d1e35", border:"1px solid rgba(249,178,26,0.1)", display:"flex", flexDirection:"column", transform: visible?"translateX(0)":"translateX(100%)", transition:"transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)", boxShadow:"-8px 0 50px rgba(0,0,0,0.5)" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#212E5C,#094F8A)", padding:"20px", borderBottom:"3px solid #F9B21A", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: favoritos.length > 0 ? "14px" : "0" }}>
            <div>
              <h2 style={{ color:"white", margin:0, fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"1.2rem" }}>❤️ Mis Favoritos</h2>
              <p style={{ color:"rgba(255,255,255,0.45)", margin:"4px 0 0", fontSize:"0.8rem", fontFamily:"'Open Sans',sans-serif" }}>
                {favoritos.length === 0 ? "Sin favoritos aún" : `${favoritos.length} película${favoritos.length>1?"s":""} guardada${favoritos.length>1?"s":""}`}
              </p>
            </div>
            <button onClick={cerrar} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:"50%", width:"34px", height:"34px", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"0.9rem", transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.22)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            >✕</button>
          </div>

          {/* Buscador dentro del panel */}
          {favoritos.length > 2 && (
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"0.85rem" }}>🔍</span>
              <input
                type="text" placeholder="Buscar en favoritos..." value={buscando}
                onChange={e => setBuscando(e.target.value)}
                style={{ width:"100%", padding:"9px 12px 9px 34px", borderRadius:"8px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"white", fontFamily:"'Open Sans',sans-serif", fontSize:"0.84rem", outline:"none", boxSizing:"border-box" }}
                onFocus={e=>e.target.style.borderColor="rgba(249,178,26,0.5)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"}
              />
            </div>
          )}
        </div>

        {/* Lista */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px" }}>
          {favoritos.length === 0 ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"14px", padding:"40px 20px", textAlign:"center" }}>
              <div style={{ fontSize:"3.5rem", opacity:0.18 }}>🎬</div>
              <p style={{ color:"rgba(255,255,255,0.3)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.95rem", margin:0 }}>
                Agrega películas a favoritos desde la cartelera
              </p>
            </div>
          ) : favoritosFiltrados.length === 0 ? (
            <div style={{ textAlign:"center", padding:"40px 0", color:"rgba(255,255,255,0.25)", fontFamily:"'Open Sans',sans-serif" }}>
              Sin resultados para "{buscando}"
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {favoritosFiltrados.map((p, i) => (
                <FavCard
                  key={p.favId} pelicula={p}
                  expandida={expandido === p.favId}
                  onExpandir={() => setExpandido(expandido === p.favId ? null : p.favId)}
                  onEliminar={onEliminar}
                  onVerDetalle={onVerDetalle ? () => { onVerDetalle(p); cerrar() } : null}
                  delay={i * 55}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer — limpiar todo */}
        {favoritos.length > 0 && (
          <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.06)", flexShrink:0 }}>
            <button
              onClick={() => { favoritos.forEach(f => onEliminar(f.favId)) }}
              style={{ width:"100%", padding:"10px", borderRadius:"10px", background:"transparent", color:"rgba(239,68,68,0.7)", border:"1px solid rgba(239,68,68,0.2)", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"600", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.5px", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.08)";e.currentTarget.style.borderColor="rgba(239,68,68,0.4)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(239,68,68,0.2)"}}
            >🗑️ Limpiar todos los favoritos</button>
          </div>
        )}
      </div>
    </>
  )
}

function FavCard({ pelicula, expandida, onExpandir, onEliminar, onVerDetalle, delay }) {
  const [in_, setIn]       = useState(false)
  const [saliendo, setSal] = useState(false)

  useEffect(() => { setTimeout(() => setIn(true), delay) }, [delay])

  const handleEliminar = (e) => {
    e.stopPropagation()
    setSal(true)
    setTimeout(() => onEliminar(pelicula.favId), 300)
  }

  return (
    <div style={{ borderRadius:"12px", background: expandida ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", border:`1px solid ${expandida ? "rgba(249,178,26,0.25)" : "rgba(255,255,255,0.07)"}`, overflow:"hidden", transition:"all 0.3s ease", opacity: saliendo ? 0 : in_ ? 1 : 0, transform: saliendo ? "translateX(50px)" : in_ ? "translateX(0)" : "translateX(20px)" }}>

      {/* Fila principal */}
      <div onClick={onExpandir} style={{ display:"flex", gap:"12px", alignItems:"center", padding:"12px 14px", cursor:"pointer" }}>
        <img src={pelicula.image} alt={pelicula.title} style={{ width:"46px", height:"64px", objectFit:"cover", borderRadius:"7px", flexShrink:0, border:"2px solid rgba(249,178,26,0.3)" }} />

        <div style={{ flex:1, minWidth:0 }}>
          <h4 style={{ margin:0, fontFamily:"'Montserrat',sans-serif", fontWeight:"700", color:"white", fontSize:"0.86rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {pelicula.title}
          </h4>
          <div style={{ display:"flex", gap:"5px", marginTop:"5px", flexWrap:"wrap" }}>
            {pelicula.year  && <span style={{ background:"rgba(9,79,138,0.6)", color:"white", padding:"2px 8px", borderRadius:"20px", fontSize:"0.68rem", fontWeight:"600", fontFamily:"'Montserrat',sans-serif" }}>{pelicula.year}</span>}
            {pelicula.genre && <span style={{ background:"rgba(249,178,26,0.18)", color:"#F9B21A", padding:"2px 8px", borderRadius:"20px", fontSize:"0.68rem", fontWeight:"600", fontFamily:"'Montserrat',sans-serif" }}>{pelicula.genre}</span>}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"5px", alignItems:"center", flexShrink:0 }}>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.7rem", transition:"transform 0.2s", transform: expandida ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
          <button onClick={handleEliminar} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:"6px", padding:"4px 7px", cursor:"pointer", color:"#ef4444", fontSize:"0.72rem", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.1)"}
          >✕</button>
        </div>
      </div>

      {/* Panel expandido con sinopsis + botones */}
      {expandida && (
        <div style={{ padding:"0 14px 14px", animation:"fadeIn 0.25s ease", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color:"rgba(255,255,255,0.45)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.8rem", lineHeight:"1.55", margin:"12px 0", paddingLeft:"4px", borderLeft:"2px solid rgba(249,178,26,0.4)" }}>
            {pelicula.sinopsis || "Sin descripción disponible."}
          </p>
          <div style={{ display:"flex", gap:"8px" }}>
            {onVerDetalle && (
              <button onClick={onVerDetalle} style={{ flex:1, padding:"8px", borderRadius:"8px", background:"linear-gradient(135deg,#F9B21A,#FF9B00)", color:"#1a1200", border:"none", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.5px", transition:"all 0.2s" }}>
                🎬 Ver detalle
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PanelFavoritos
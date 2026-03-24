import { useState, useMemo, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_URL } from "../Peliculas.config"

// useParams extrae el :id de la URL /pelicula/:id
// useNavigate permite navegar hacia atrás
// useLocation recupera el estado pasado al navegar (datos de la película)

const GENEROS_MAP = {
  28:"Acción", 12:"Aventura", 16:"Animación", 35:"Comedia", 80:"Crimen",
  99:"Documental", 18:"Drama", 10751:"Familia", 14:"Fantasía", 36:"Historia",
  27:"Terror", 10402:"Música", 9648:"Misterio", 10749:"Romance",
  878:"Ciencia ficción", 53:"Suspenso", 10752:"Bélica", 37:"Western"
}

function generarAsientos(titulo) {
  const filas = ["A","B","C","D","E","F","G","H"]
  const seed = titulo.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const asientos = []
  filas.forEach((fila, fi) => {
    for (let num = 1; num <= 10; num++) {
      const hash = ((seed * (fi + 1) * num) % 97)
      asientos.push({ id:`${fila}${num}`, fila, num, ocupado: hash < 28, esVIP: fila==="A"||fila==="B" })
    }
  })
  return asientos
}

function Detalle({ onComprar }) {
  // ── useParams: lee el id dinámico de la URL ──────────────────────────────
  const { id }       = useParams()
  const navigate     = useNavigate()
  const location     = useLocation()

  // La película puede venir por state de navigate() o se carga desde TMDB
  const [pelicula, setPelicula] = useState(location.state?.pelicula || null)
  const [loading, setLoading]   = useState(!pelicula)

  // Si no viene por state, la cargamos desde TMDB usando el id de la URL
  useEffect(() => {
    if (pelicula) return
    if (!TMDB_API_KEY || TMDB_API_KEY === "AQUI_TU_API_KEY") {
      setPelicula({ id, title: `Película #${id}`, image:"", year:"—", genre:"—", sinopsis:"Sin información disponible.", rating:"—" })
      setLoading(false)
      return
    }
    fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=es-MX`)
      .then(r => r.json())
      .then(data => {
        setPelicula({
          id:       data.id,
          title:    data.title,
          image:    data.poster_path ? `${TMDB_IMAGE_URL}${data.poster_path}` : "",
          year:     data.release_date?.substring(0,4) || "—",
          genre:    data.genres?.[0]?.name || "Película",
          sinopsis: data.overview || "Sin descripción.",
          rating:   data.vote_average?.toFixed(1) || "—",
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const [horarioSeleccionado,  setHorario]   = useState(null)
  const [formatoSeleccionado,  setFormato]   = useState("2D")
  const [asientosSeleccionados,setAsientos]  = useState([])
  const [mostrarAsientos,      setMostrar]   = useState(false)

  const horarios   = ["14:00","16:30","18:30","20:30","22:15"]
  const formatos   = ["2D","3D","IMAX","4DX","VIP"]
  const precioBase = { "2D":85,"3D":110,"IMAX":160,"4DX":185,"VIP":220 }

  const asientos = useMemo(() => pelicula ? generarAsientos(pelicula.title) : [], [pelicula?.title])
  const filas    = [...new Set(asientos.map(a => a.fila))]

  const toggleAsiento = (a) => {
    if (a.ocupado) return
    setAsientos(prev =>
      prev.includes(a.id) ? prev.filter(id => id !== a.id)
        : prev.length < 8 ? [...prev, a.id] : prev
    )
  }

  const totalPrecio = asientosSeleccionados.length * precioBase[formatoSeleccionado]

  if (loading) return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:"44px", height:"44px", margin:"0 auto", border:"3px solid rgba(255,255,255,0.08)", borderTop:"3px solid #F9B21A", borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
        <p style={{ marginTop:"14px", color:"rgba(255,255,255,0.35)", fontFamily:"'Open Sans',sans-serif" }}>Cargando película...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (!pelicula) return (
    <div style={{ textAlign:"center", padding:"80px 24px", color:"rgba(255,255,255,0.3)", background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div style={{ fontSize:"3rem", marginBottom:"16px" }}>🎬</div>
      <p style={{ fontFamily:"'Open Sans',sans-serif", marginBottom:"20px" }}>Película no encontrada</p>
      <button onClick={() => navigate("/cartelera")} className="btn-outline">← Ver cartelera</button>
    </div>
  )

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>

      {/* Hero backdrop */}
      <div style={{ position:"relative", height:"320px", overflow:"hidden", background:"linear-gradient(135deg,#0f2040,#1a3a6b)" }}>
        {pelicula.image && (
          <img src={pelicula.image} alt={pelicula.title}
            style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.15, filter:"blur(10px)", transform:"scale(1.08)" }} />
        )}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)" }} />

        {/* useNavigate(-1): volver a la página anterior */}
        <button onClick={() => navigate(-1)}
          style={{ position:"absolute", top:"24px", left:"28px", padding:"9px 20px", borderRadius:"25px", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", color:"white", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.85rem", zIndex:2, transition:"background 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
        >← Volver</button>

        {/* URL dinámica visible como breadcrumb */}
        <div style={{ position:"absolute", bottom:"80px", left:"28px", color:"rgba(255,255,255,0.3)", fontSize:"0.75rem", fontFamily:"'Montserrat',sans-serif" }}>
          /pelicula/<span style={{ color:"#F9B21A" }}>{id}</span>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"-180px auto 0", padding:"0 28px 60px", position:"relative", zIndex:1 }}>

        {/* Info */}
        <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:"36px", alignItems:"start", marginBottom:"40px" }}>
          {pelicula.image
            ? <img src={pelicula.image} alt={pelicula.title} style={{ width:"100%", borderRadius:"14px", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", border:"3px solid rgba(249,178,26,0.4)" }} />
            : <div style={{ width:"100%", aspectRatio:"2/3", borderRadius:"14px", background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3rem" }}>🎬</div>
          }
          <div style={{ paddingTop:"130px" }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
              <Chip color="#F9B21A" text={pelicula.year} />
              <Chip color="#094F8A" text={pelicula.genre} />
              {pelicula.rating && pelicula.rating !== "—" && <Chip color="#36F5AF" text={`⭐ ${pelicula.rating}`} />}
            </div>
            <h1 style={{ fontSize:"clamp(1.5rem,4vw,2.4rem)", fontWeight:"900", marginBottom:"14px", lineHeight:"1.2" }}>{pelicula.title}</h1>
            <p style={{ color:"rgba(255,255,255,0.5)", lineHeight:"1.8", fontSize:"0.98rem", fontFamily:"'Open Sans',sans-serif", maxWidth:"560px" }}>{pelicula.sinopsis}</p>
          </div>
        </div>

        {/* Formato */}
        <Seccion titulo="Formato de exhibición">
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {formatos.map(f => (
              <button key={f} onClick={() => setFormato(f)}
                style={{ padding:"9px 20px", borderRadius:"10px", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.82rem", transition:"all 0.2s",
                  background: formatoSeleccionado===f ? "rgba(249,178,26,0.2)" : "rgba(255,255,255,0.05)",
                  border: formatoSeleccionado===f ? "2px solid #F9B21A" : "1px solid rgba(255,255,255,0.1)",
                  color: formatoSeleccionado===f ? "#F9B21A" : "rgba(255,255,255,0.5)" }}>
                <div>{f}</div>
                <div style={{ fontSize:"0.68rem", fontWeight:"500", marginTop:"2px", color: formatoSeleccionado===f ? "rgba(249,178,26,0.7)" : "rgba(255,255,255,0.3)" }}>${precioBase[f]}/boleto</div>
              </button>
            ))}
          </div>
        </Seccion>

        {/* Horario */}
        <Seccion titulo="Horario de función">
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            {horarios.map(h => (
              <button key={h} onClick={() => { setHorario(h); setAsientos([]); setMostrar(false) }}
                style={{ padding:"10px 22px", borderRadius:"10px", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.88rem", transition:"all 0.2s",
                  background: horarioSeleccionado===h ? "linear-gradient(135deg,#36F5AF,#2ed9a0)" : "rgba(255,255,255,0.05)",
                  border: horarioSeleccionado===h ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: horarioSeleccionado===h ? "#0a3d2b" : "rgba(255,255,255,0.6)",
                  boxShadow: horarioSeleccionado===h ? "0 4px 14px rgba(54,245,175,0.35)" : "none" }}>
                {h} hrs
              </button>
            ))}
          </div>
        </Seccion>

        {/* Asientos */}
        <Seccion titulo="Selección de asientos">
          {!horarioSeleccionado ? (
            <div style={{ padding:"20px", background:"rgba(255,255,255,0.03)", borderRadius:"12px", border:"1px dashed rgba(255,255,255,0.1)", textAlign:"center" }}>
              <p style={{ color:"rgba(255,255,255,0.3)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.9rem", margin:0 }}>Selecciona un horario primero</p>
            </div>
          ) : (
            <div>
              <button onClick={() => setMostrar(p => !p)}
                style={{ marginBottom:"20px", padding:"10px 22px", borderRadius:"10px", background:"rgba(54,245,175,0.1)", border:"1px solid rgba(54,245,175,0.3)", color:"#36F5AF", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.85rem", transition:"all 0.2s" }}>
                {mostrarAsientos ? "▲ Ocultar mapa" : "🪑 Ver mapa de asientos"}
              </button>

              {mostrarAsientos && (
                <div style={{ animation:"fadeIn 0.3s ease" }}>
                  <div style={{ textAlign:"center", marginBottom:"24px" }}>
                    <div style={{ display:"inline-block", width:"60%", height:"6px", background:"linear-gradient(90deg,transparent,rgba(249,178,26,0.6),transparent)", borderRadius:"3px", marginBottom:"8px" }} />
                    <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.72rem", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", textTransform:"uppercase", letterSpacing:"3px", margin:0 }}>Pantalla</p>
                  </div>
                  <div style={{ overflowX:"auto", paddingBottom:"8px" }}>
                    <div style={{ display:"inline-flex", flexDirection:"column", gap:"8px", minWidth:"fit-content" }}>
                      {filas.map(fila => (
                        <div key={fila} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                          <span style={{ width:"20px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:"0.75rem", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", flexShrink:0 }}>{fila}</span>
                          {asientos.filter(a => a.fila===fila).map(a => {
                            const sel = asientosSeleccionados.includes(a.id)
                            return (
                              <button key={a.id} onClick={() => toggleAsiento(a)}
                                title={a.ocupado ? "Ocupado" : a.id}
                                style={{ width:"30px", height:"26px", borderRadius:"6px 6px 3px 3px", border:"none",
                                  cursor: a.ocupado ? "not-allowed" : "pointer", transition:"all 0.15s",
                                  transform: sel ? "scale(1.15)" : "scale(1)",
                                  outline: sel ? "2px solid #F9B21A" : "none",
                                  background: a.ocupado ? "rgba(239,68,68,0.35)" : sel ? "linear-gradient(135deg,#F9B21A,#FF9B00)" : a.esVIP ? "rgba(168,85,247,0.25)" : "rgba(54,245,175,0.2)",
                                  boxShadow: sel ? "0 0 10px rgba(249,178,26,0.5)" : "none" }} />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"20px", marginTop:"16px", flexWrap:"wrap" }}>
                    {[["rgba(54,245,175,0.2)","Disponible"],["rgba(168,85,247,0.25)","VIP"],["linear-gradient(135deg,#F9B21A,#FF9B00)","Seleccionado"],["rgba(239,68,68,0.35)","Ocupado"]].map(([c,l]) => (
                      <div key={l} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        <div style={{ width:"22px", height:"18px", borderRadius:"4px 4px 2px 2px", background:c, flexShrink:0 }} />
                        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", fontFamily:"'Open Sans',sans-serif" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                  {asientosSeleccionados.length > 0 && (
                    <div style={{ marginTop:"20px", padding:"14px 18px", background:"rgba(249,178,26,0.07)", borderRadius:"12px", border:"1px solid rgba(249,178,26,0.2)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
                      <div>
                        <p style={{ margin:0, color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", fontFamily:"'Open Sans',sans-serif" }}>Asientos: {asientosSeleccionados.join(", ")}</p>
                        <p style={{ margin:"4px 0 0", color:"white", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.9rem" }}>{asientosSeleccionados.length} boleto{asientosSeleccionados.length>1?"s":""} · {formatoSeleccionado}</p>
                      </div>
                      <span style={{ color:"#F9B21A", fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"1.5rem" }}>${totalPrecio} MXN</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Seccion>

        <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
          <button onClick={() => onComprar({ ...pelicula, horario: horarioSeleccionado||"20:30", formato:formatoSeleccionado, asientos:asientosSeleccionados, total:totalPrecio })}
            className="btn-primary" style={{ flex:1, minWidth:"180px", fontSize:"1rem", padding:"14px 24px" }}>
            🎫 {asientosSeleccionados.length > 0 ? `Comprar ${asientosSeleccionados.length} boleto${asientosSeleccionados.length>1?"s":""}` : "Comprar boletos"}
          </button>
          <button className="btn-outline" style={{ flex:1, minWidth:"160px", fontSize:"1rem", padding:"14px 24px" }}>▶ Ver trailer</button>
        </div>

        <div style={{ marginTop:"16px", padding:"12px 18px", background:"rgba(54,245,175,0.07)", borderRadius:"12px", border:"1px solid rgba(54,245,175,0.15)", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#36F5AF", flexShrink:0, boxShadow:"0 0 8px rgba(54,245,175,0.6)" }} />
          <span style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.86rem" }}>
            {asientos.filter(a=>!a.ocupado).length} asientos disponibles
          </span>
        </div>
      </div>
    </div>
  )
}

function Seccion({ titulo, children }) {
  return (
    <div style={{ marginBottom:"32px" }}>
      <p style={{ color:"rgba(255,255,255,0.4)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"1.5px", margin:"0 0 12px" }}>{titulo}</p>
      {children}
    </div>
  )
}

function Chip({ color, text }) {
  return <span style={{ padding:"5px 14px", borderRadius:"20px", background:`${color}22`, color, border:`1px solid ${color}55`, fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.8rem" }}>{text}</span>
}

export default Detalle
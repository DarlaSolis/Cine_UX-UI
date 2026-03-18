import { useState } from "react"

// Datos estáticos de secciones
const secciones = [
  {
    id: "promociones", titulo: "Promociones", emoji: "🏷️",
    items: [
      { nombre: "Martes de Descuento", detalle: "2×1 en todos los boletos", precio: "$99" },
      { nombre: "Combo Familiar",       detalle: "4 boletos + 2 palomitas grandes", precio: "$399" },
      { nombre: "Estudiantes",          detalle: "30% de descuento con credencial", precio: "$70" },
      { nombre: "Miércoles de Dulcería",detalle: "50% en combos de dulcería", precio: "Desde $45" },
    ]
  },
  {
    id: "membresias", titulo: "Membresías", emoji: "⭐",
    items: [
      { nombre: "CinePlus Basic",   detalle: "2 boletos gratis por mes", precio: "$149/mes" },
      { nombre: "CinePlus Gold",    detalle: "50% dulcería + 4 boletos", precio: "$349/mes" },
      { nombre: "Membresía Anual",  detalle: "Beneficios todo el año", precio: "$2,999/año" },
      { nombre: "Family Pack",      detalle: "Hasta 5 miembros", precio: "$599/mes" },
    ]
  },
  {
    id: "formatos", titulo: "Formatos Especiales", emoji: "🎞️",
    items: [
      { nombre: "IMAX",    detalle: "Pantalla gigante y sonido envolvente", precio: "$180" },
      { nombre: "4DX",     detalle: "Movimiento y efectos especiales",      precio: "$200" },
      { nombre: "ScreenX", detalle: "270° de proyección",                   precio: "$170" },
      { nombre: "VIP",     detalle: "Butacas reclinables + servicio",        precio: "$250" },
      { nombre: "3D",      detalle: "Experiencia tridimensional",           precio: "$150" },
    ]
  },
]

function Otros() {
  // useState #1: pestaña activa (selección activa)
  const [seccionActiva, setSeccionActiva] = useState("promociones")

  // useState #2: formulario controlado (registro para noticias/boletín)
  const [form, setForm] = useState({ nombre: "", email: "", preferencia: "estrenos", acepta: false })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  // onChange: actualiza campos del formulario controlado
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }))
  }

  // onSubmit: valida y muestra resumen
  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = "El nombre es requerido"
    if (!form.email.trim()) errs.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email no válido"
    if (!form.acepta) errs.acepta = "Debes aceptar recibir comunicaciones"
    setErrores(errs)
    if (Object.keys(errs).length === 0) setEnviado(true)
  }

  const seccionData = secciones.find(s => s.id === seccionActiva)

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* Hero */}
      <div className="page-hero">
        <span className="eyebrow">✨ Beneficios Cinépolis</span>
        <h1>Experiencias Especiales</h1>
        <p>Descubre todo lo que Cinépolis tiene para ti</p>
      </div>

      <div className="main-content">

        {/* Tabs de secciones — onClick: selección activa */}
        <div style={{
          display: "flex", gap: "0",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          marginBottom: "36px", overflowX: "auto", scrollbarWidth: "none"
        }}>
          {secciones.map(s => (
            <button
              key={s.id}
              onClick={() => setSeccionActiva(s.id)}
              style={{
                padding: "14px 24px", border: "none", background: "transparent",
                cursor: "pointer", whiteSpace: "nowrap",
                fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
                fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.8px",
                color: seccionActiva === s.id ? "#F9B21A" : "rgba(255,255,255,0.38)",
                borderBottom: seccionActiva === s.id ? "3px solid #F9B21A" : "3px solid transparent",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={e => { if (seccionActiva !== s.id) e.currentTarget.style.color = "rgba(255,255,255,0.65)" }}
              onMouseLeave={e => { if (seccionActiva !== s.id) e.currentTarget.style.color = "rgba(255,255,255,0.38)" }}
            >
              {s.emoji} {s.titulo}
            </button>
          ))}
        </div>

        {/* Grid de items de la sección activa */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "64px" }}>
          {seccionData.items.map((item, i) => (
            <ItemCard key={i} item={item} />
          ))}
        </div>

        {/* ── FORMULARIO CONTROLADO ── */}
        {/* Registro para boletín de noticias y estrenos */}
        <div style={{
          background: "linear-gradient(135deg, #0f2040 0%, #1a3a6b 60%, #0f2040 100%)",
          borderRadius: "20px", padding: "48px 36px",
          border: "1px solid rgba(249,178,26,0.15)",
          position: "relative", overflow: "hidden"
        }}>
          {/* Decoration */}
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,178,26,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <span style={{ color: "#36F5AF", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "0.75rem", letterSpacing: "3px", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
              📬 Boletín de noticias
            </span>
            <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", fontWeight: "900", marginBottom: "8px", letterSpacing: "-0.3px" }}>
              Mantente al tanto de los estrenos
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.95rem", marginBottom: "32px" }}>
              Regístrate y recibe notificaciones de estrenos, preventas y promociones exclusivas.
            </p>

            {!enviado ? (
              /* onSubmit en el formulario */
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Input 1: Nombre */}
                <div>
                  <label className="dark-label">Nombre completo</label>
                  <input
                    className={`dark-input${errores.nombre ? " input-error" : ""}`}
                    type="text" name="nombre"
                    value={form.nombre} onChange={handleChange}   /* onChange */
                    placeholder="Ej: Ana García"
                    style={{ border: errores.nombre ? "1.5px solid #ef4444" : undefined }}
                  />
                  {errores.nombre && <ErrMsg>{errores.nombre}</ErrMsg>}
                </div>

                {/* Input 2: Email */}
                <div>
                  <label className="dark-label">Correo electrónico</label>
                  <input
                    className="dark-input"
                    type="email" name="email"
                    value={form.email} onChange={handleChange}    /* onChange */
                    placeholder="correo@ejemplo.com"
                    style={{ border: errores.email ? "1.5px solid #ef4444" : undefined }}
                  />
                  {errores.email && <ErrMsg>{errores.email}</ErrMsg>}
                </div>

                {/* Preferencia — onChange con radio buttons visuales */}
                <div>
                  <label className="dark-label" style={{ marginBottom: "10px" }}>¿Qué te interesa más?</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[
                      { value: "estrenos",    emoji: "🎬", label: "Estrenos y cartelera" },
                      { value: "promociones", emoji: "🏷️", label: "Promociones" },
                      { value: "eventos",     emoji: "🎪", label: "Eventos especiales" },
                      { value: "todo",        emoji: "⭐", label: "Todo lo anterior" },
                    ].map(op => {
                      const activo = form.preferencia === op.value
                      return (
                        <label
                          key={op.value}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            gap: "6px", padding: "14px 10px", borderRadius: "12px",
                            cursor: "pointer", textAlign: "center",
                            background: activo ? "rgba(249,178,26,0.13)" : "rgba(255,255,255,0.04)",
                            border: `1.5px solid ${activo ? "#F9B21A" : "rgba(255,255,255,0.1)"}`,
                            transition: "all 0.2s ease",
                            boxShadow: activo ? "0 0 16px rgba(249,178,26,0.15)" : "none"
                          }}
                          onMouseEnter={e => { if (!activo) e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)" }}
                          onMouseLeave={e => { if (!activo) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                        >
                          <input
                            type="radio" name="preferencia" value={op.value}
                            checked={activo} onChange={handleChange}
                            style={{ display: "none" }}
                          />
                          <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{op.emoji}</span>
                          <span style={{
                            fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
                            fontSize: "0.75rem", color: activo ? "#F9B21A" : "rgba(255,255,255,0.5)",
                            letterSpacing: "0.3px", lineHeight: "1.3", transition: "color 0.2s"
                          }}>{op.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Checkbox */}
                <div>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="checkbox" name="acepta"
                      checked={form.acepta} onChange={handleChange}  /* onChange */
                      style={{ accentColor: "#F9B21A", width: "17px", height: "17px", marginTop: "2px", flexShrink: 0 }}
                    />
                    <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "0.87rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.5" }}>
                      Acepto recibir comunicaciones de Cinépolis y entiendo que puedo cancelar mi suscripción en cualquier momento
                    </span>
                  </label>
                  {errores.acepta && <ErrMsg>{errores.acepta}</ErrMsg>}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
                >
                  📩 Suscribirme al boletín
                </button>
              </form>

            ) : (
              /* Resultado del formulario — muestra la información ingresada */
              <div style={{
                textAlign: "center", padding: "10px 0",
                animation: "fadeIn 0.4s ease"
              }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "14px", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "900", marginBottom: "8px", color: "#F9B21A" }}>
                  ¡Registro exitoso!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem", marginBottom: "28px" }}>
                  Te enviaremos novedades a tu correo
                </p>

                {/* Datos ingresados visibles */}
                <div style={{
                  background: "rgba(255,255,255,0.05)", borderRadius: "14px",
                  padding: "20px 24px", textAlign: "left", marginBottom: "24px",
                  border: "1px solid rgba(249,178,26,0.15)"
                }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>
                    Datos del registro
                  </p>
                  {[
                    ["👤 Nombre",      form.nombre],
                    ["📧 Email",       form.email],
                    ["⭐ Interés",     { estrenos: "Estrenos y cartelera", promociones: "Promociones y descuentos", eventos: "Eventos especiales", todo: "Todo lo anterior" }[form.preferencia]],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Open Sans', sans-serif" }}>
                      <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.85rem" }}>{label}</span>
                      <span style={{ color: "white", fontWeight: "600", fontSize: "0.85rem" }}>{val}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setEnviado(false); setForm({ nombre: "", email: "", preferencia: "estrenos", acepta: false }) }}
                  className="btn-outline"
                  style={{ width: "100%" }}
                >
                  Registrar otro correo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ItemCard({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px", borderRadius: "14px",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(249,178,26,0.3)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px"
      }}
    >
      <div>
        <h4 style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "0.92rem", marginBottom: "5px" }}>
          {item.nombre}
        </h4>
        <p style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.82rem", margin: 0 }}>
          {item.detalle}
        </p>
      </div>
      <span style={{
        color: "#F9B21A", fontFamily: "'Montserrat', sans-serif",
        fontWeight: "900", fontSize: "1rem", flexShrink: 0
      }}>{item.precio}</span>
    </div>
  )
}

function ErrMsg({ children }) {
  return <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "5px 0 0", fontFamily: "'Open Sans', sans-serif" }}>{children}</p>
}

export default Otros
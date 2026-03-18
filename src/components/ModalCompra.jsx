import { useState, useEffect } from "react"

function ModalCompra({ pelicula, onComprar, onCerrar }) {
  const [formData, setFormData] = useState({
    nombre: "", email: "", cantidadBoletos: 1,
    horario: "20:30", metodoPago: "tarjeta", aceptaTerminos: false
  })
  const [mostrarResumen, setMostrarResumen] = useState(false)
  const [errores, setErrores] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const cerrar = () => { setVisible(false); setTimeout(onCerrar, 300) }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }))
  }

  const validar = () => {
    const errs = {}
    if (!formData.nombre.trim()) errs.nombre = "El nombre es requerido"
    if (!formData.email.trim()) errs.email = "Email requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email no válido"
    if (!formData.aceptaTerminos) errs.aceptaTerminos = "Debes aceptar los términos"
    setErrores(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validar()) {
      setMostrarResumen(true)
      onComprar({ ...formData, pelicula: pelicula.title, total: formData.cantidadBoletos * 85 })
    }
  }

  const total = formData.cantidadBoletos * 85

  const inputStyle = err => ({
    width: "100%", padding: "11px 14px", borderRadius: "10px",
    background: "rgba(255,255,255,0.06)",
    border: `1.5px solid ${err ? "#ef4444" : "rgba(255,255,255,0.12)"}`,
    color: "white", fontFamily: "'Open Sans', sans-serif", fontSize: "0.92rem",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
  })

  return (
    <div
      onClick={cerrar}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(10,22,40,0.82)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        opacity: visible ? 1 : 0, transition: "opacity 0.3s ease"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0d1e35",
          border: "1px solid rgba(249,178,26,0.2)",
          borderRadius: "20px", width: "100%", maxWidth: "500px",
          maxHeight: "92vh", overflowY: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #212E5C, #094F8A)",
          borderRadius: "20px 20px 0 0",
          padding: "20px 22px",
          display: "flex", alignItems: "center", gap: "14px",
          borderBottom: "2px solid #F9B21A", position: "relative"
        }}>
          <img src={pelicula.image} alt={pelicula.title}
            style={{ width: "52px", height: "74px", objectFit: "cover", borderRadius: "8px", border: "2px solid rgba(249,178,26,0.5)", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "#F9B21A", fontSize: "0.7rem", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 4px" }}>
              🎫 Comprar boletos
            </p>
            <h3 style={{ color: "white", margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: "800", fontSize: "1.05rem", lineHeight: "1.3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {pelicula.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", margin: "4px 0 0", fontSize: "0.8rem", fontFamily: "'Open Sans', sans-serif" }}>
              {pelicula.year} · {pelicula.genre}
            </p>
          </div>
          <button onClick={cerrar} style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "32px", height: "32px", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >✕</button>
        </div>

        <div style={{ padding: "24px" }}>
          {!mostrarResumen ? (
            <form onSubmit={handleSubmit} noValidate>

              {/* Nombre */}
              <div style={{ marginBottom: "16px" }}>
                <label className="dark-label">Nombre completo</label>
                <input type="text" name="nombre" value={formData.nombre}
                  onChange={handleChange} placeholder="Ej: Juan Pérez"
                  style={inputStyle(errores.nombre)}
                  onFocus={e => e.target.style.borderColor = "#F9B21A"}
                  onBlur={e => e.target.style.borderColor = errores.nombre ? "#ef4444" : "rgba(255,255,255,0.12)"}
                />
                {errores.nombre && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "4px 0 0" }}>{errores.nombre}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <label className="dark-label">Correo electrónico</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="ejemplo@correo.com"
                  style={inputStyle(errores.email)}
                  onFocus={e => e.target.style.borderColor = "#F9B21A"}
                  onBlur={e => e.target.style.borderColor = errores.email ? "#ef4444" : "rgba(255,255,255,0.12)"}
                />
                {errores.email && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "4px 0 0" }}>{errores.email}</p>}
              </div>

              {/* Cantidad + horario */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label className="dark-label">Boletos</label>
                  <select name="cantidadBoletos" value={formData.cantidadBoletos} onChange={handleChange} style={{ ...inputStyle(), cursor: "pointer" }}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: "#0d1e35" }}>{n} boleto{n>1?"s":""}</option>)}
                  </select>
                </div>
                <div>
                  <label className="dark-label">Horario</label>
                  <select name="horario" value={formData.horario} onChange={handleChange} style={{ ...inputStyle(), cursor: "pointer" }}>
                    {["14:00","16:30","18:30","20:30","22:15"].map(h => <option key={h} value={h} style={{ background: "#0d1e35" }}>{h} hrs</option>)}
                  </select>
                </div>
              </div>

              {/* Método de pago */}
              <div style={{ marginBottom: "16px" }}>
                <label className="dark-label" style={{ marginBottom: "10px" }}>Método de pago</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[{ v:"tarjeta",l:"💳 Tarjeta"},{ v:"efectivo",l:"💵 Efectivo"},{ v:"transferencia",l:"📱 Transferencia"}].map(op => (
                    <label key={op.v} style={{ display: "flex", alignItems: "center", gap: "7px", cursor: "pointer", padding: "8px 14px", borderRadius: "10px", border: `1.5px solid ${formData.metodoPago===op.v ? "#F9B21A" : "rgba(255,255,255,0.1)"}`, background: formData.metodoPago===op.v ? "rgba(249,178,26,0.12)" : "rgba(255,255,255,0.04)", color: formData.metodoPago===op.v ? "#F9B21A" : "rgba(255,255,255,0.5)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.85rem", fontWeight: formData.metodoPago===op.v?"700":"400", transition: "all 0.2s" }}>
                      <input type="radio" name="metodoPago" value={op.v} checked={formData.metodoPago===op.v} onChange={handleChange} style={{ display: "none" }} />
                      {op.l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Términos */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} style={{ accentColor: "#F9B21A", width: "16px", height: "16px", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.45)" }}>
                    Acepto los <span style={{ color: "#F9B21A" }}>términos y condiciones</span>
                  </span>
                </label>
                {errores.aceptaTerminos && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "4px 0 0" }}>{errores.aceptaTerminos}</p>}
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(249,178,26,0.07)", borderRadius: "12px", border: "1px solid rgba(249,178,26,0.15)", marginBottom: "20px" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Open Sans', sans-serif" }}>{formData.cantidadBoletos} × $85</p>
                  <p style={{ margin: "2px 0 0", fontWeight: "700", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem" }}>Total a pagar</p>
                </div>
                <span style={{ color: "#F9B21A", fontSize: "1.7rem", fontWeight: "900", fontFamily: "'Montserrat', sans-serif" }}>${total}</span>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "1rem" }}>
                ✅ Confirmar compra
              </button>
            </form>

          ) : (
            /* Resumen post-compra */
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "12px", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "900", fontSize: "1.3rem", marginBottom: "6px" }}>¡Compra confirmada!</h4>
              <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.88rem", marginBottom: "24px" }}>Te enviamos los boletos a tu correo</p>

              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "18px", marginBottom: "22px", textAlign: "left", border: "1px solid rgba(249,178,26,0.12)" }}>
                {[["🎬","Película",pelicula.title],["👤","Nombre",formData.nombre],["📧","Email",formData.email],["🎟️","Boletos",`${formData.cantidadBoletos} boleto${formData.cantidadBoletos>1?"s":""}`],["🕐","Horario",`${formData.horario} hrs`],["💳","Pago",formData.metodoPago.charAt(0).toUpperCase()+formData.metodoPago.slice(1)]].map(([ic,label,val])=>(
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Open Sans', sans-serif" }}>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>{ic} {label}</span>
                    <span style={{ color: "white", fontWeight: "600", fontSize: "0.85rem", maxWidth: "180px", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "700", color: "white" }}>💰 Total</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "900", color: "#F9B21A", fontSize: "1.2rem" }}>${total} MXN</span>
                </div>
              </div>

              <button onClick={cerrar} className="btn-primary" style={{ width: "100%", padding: "13px", fontSize: "0.95rem" }}>Cerrar</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        select option { background: #0d1e35; color: white; }
      `}</style>
    </div>
  )
}

export default ModalCompra
import { useState } from "react"
import Button from "./Button"

function FormularioCompra({ pelicula, onComprar, onCerrar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    cantidadBoletos: 1,
    horario: "20:30",
    metodoPago: "tarjeta",
    aceptaTerminos: false
  })

  const [mostrarResumen, setMostrarResumen] = useState(false)
  const [errores, setErrores] = useState({})

  // onChange: actualiza cada campo del formulario controlado
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }))
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim())
      nuevosErrores.nombre = "El nombre es requerido"
    if (!formData.email.trim())
      nuevosErrores.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      nuevosErrores.email = "Email no válido"
    if (!formData.aceptaTerminos)
      nuevosErrores.aceptaTerminos = "Debes aceptar los términos"
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // onSubmit: valida y muestra resumen con la información ingresada
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      setMostrarResumen(true)
      onComprar({
        ...formData,
        pelicula: pelicula.title,
        total: formData.cantidadBoletos * 85
      })
    }
  }

  const totalPagar = formData.cantidadBoletos * 85

  const inputStyle = (campo) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: errores[campo] ? "2px solid #ff4444" : "1.5px solid #dde3ef",
    fontSize: "1rem",
    fontFamily: "'Open Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box"
  })

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#212E5C",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem"
  }

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "16px",
      padding: "28px",
      boxShadow: "0 8px 24px rgba(9,79,138,0.13)",
      marginTop: "20px",
      position: "relative",
      border: "1px solid #e8edf5"
    }}>
      <button
        onClick={onCerrar}
        style={{
          position: "absolute", top: "14px", right: "14px",
          background: "#f5f7fa", border: "none",
          borderRadius: "50%", width: "32px", height: "32px",
          fontSize: "1rem", cursor: "pointer", color: "#666"
        }}
      >✕</button>

      <h3 style={{
        color: "#212E5C", marginBottom: "24px", paddingRight: "40px",
        fontFamily: "'Montserrat', sans-serif", fontWeight: "800", fontSize: "1.3rem"
      }}>
        🎫 Comprar boletos — <span style={{ color: "#F9B21A" }}>{pelicula?.title}</span>
      </h3>

      {!mostrarResumen ? (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={inputStyle("nombre")}
              placeholder="Ej: Juan Pérez"
            />
            {errores.nombre && <p style={{ color: "#ff4444", fontSize: "0.82rem", marginTop: "4px" }}>{errores.nombre}</p>}
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle("email")}
              placeholder="ejemplo@correo.com"
            />
            {errores.email && <p style={{ color: "#ff4444", fontSize: "0.82rem", marginTop: "4px" }}>{errores.email}</p>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
            <div>
              <label style={labelStyle}>Cantidad de boletos</label>
              <select
                name="cantidadBoletos"
                value={formData.cantidadBoletos}
                onChange={handleChange}
                style={{ ...inputStyle("cantidadBoletos"), cursor: "pointer" }}
              >
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n} boleto{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Horario</label>
              <select
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                style={{ ...inputStyle("horario"), cursor: "pointer" }}
              >
                <option value="16:00">16:00 hrs</option>
                <option value="18:30">18:30 hrs</option>
                <option value="20:30">20:30 hrs</option>
                <option value="22:15">22:15 hrs</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Método de pago</label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { value: "tarjeta", label: "💳 Tarjeta" },
                { value: "efectivo", label: "💵 Efectivo" },
                { value: "transferencia", label: "📱 Transferencia" }
              ].map(op => (
                <label key={op.value} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  cursor: "pointer", padding: "8px 14px", borderRadius: "8px",
                  border: "1.5px solid",
                  borderColor: formData.metodoPago === op.value ? "#094F8A" : "#dde3ef",
                  backgroundColor: formData.metodoPago === op.value ? "#eef4fb" : "white",
                  fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem",
                  transition: "all 0.2s"
                }}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value={op.value}
                    checked={formData.metodoPago === op.value}
                    onChange={handleChange}
                    style={{ accentColor: "#094F8A" }}
                  />
                  {op.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                style={{ accentColor: "#094F8A", width: "16px", height: "16px" }}
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem", color: "#444" }}>
                Acepto los términos y condiciones de compra
              </span>
            </label>
            {errores.aceptaTerminos && <p style={{ color: "#ff4444", fontSize: "0.82rem", marginTop: "4px" }}>{errores.aceptaTerminos}</p>}
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "22px", padding: "16px 20px",
            backgroundColor: "#F5F7FA", borderRadius: "10px"
          }}>
            <span style={{ fontWeight: "700", color: "#212E5C", fontFamily: "'Montserrat', sans-serif" }}>
              Total a pagar:
            </span>
            <span style={{ color: "#F9B21A", fontSize: "1.6rem", fontWeight: "800", fontFamily: "'Montserrat', sans-serif" }}>
              ${totalPagar} MXN
            </span>
          </div>

          <Button text="✅ Confirmar compra" size="large" variant="primary" />
        </form>

      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, #f0fff8, #e6f7f1)",
            padding: "28px", borderRadius: "12px",
            marginBottom: "20px", border: "1.5px solid #36F5AF"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🎉</div>
            <h4 style={{ color: "#212E5C", marginBottom: "18px", fontSize: "1.3rem", fontFamily: "'Montserrat', sans-serif" }}>
              ¡Compra confirmada!
            </h4>
            {[
              ["🎬 Película", pelicula.title],
              ["👤 Nombre", formData.nombre],
              ["📧 Email", formData.email],
              ["🎟️ Boletos", formData.cantidadBoletos + " boleto(s)"],
              ["🕐 Horario", formData.horario + " hrs"],
              ["💳 Pago", formData.metodoPago.charAt(0).toUpperCase() + formData.metodoPago.slice(1)],
              ["💰 Total", "$" + totalPagar + " MXN"]
            ].map(([label, valor]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #d4f5e9",
                fontFamily: "'Open Sans', sans-serif"
              }}>
                <span style={{ color: "#666", fontSize: "0.9rem" }}>{label}</span>
                <span style={{ fontWeight: "700", fontSize: "0.9rem", color: label.includes("Total") ? "#F9B21A" : "#212E5C" }}>
                  {valor}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button
              text="Nueva compra"
              onClick={() => {
                setMostrarResumen(false)
                setFormData({ nombre: "", email: "", cantidadBoletos: 1, horario: "20:30", metodoPago: "tarjeta", aceptaTerminos: false })
              }}
              variant="secondary"
            />
            <Button text="Cerrar" onClick={onCerrar} variant="outline" />
          </div>
        </div>
      )}
    </div>
  )
}

export default FormularioCompra
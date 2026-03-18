import { useEffect, useState } from "react"

function PanelCarrito({ carrito, onActualizar, onEliminar, onVaciar, onCerrar }) {
  const [visible, setVisible] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const cerrar = () => {
    setVisible(false)
    setTimeout(onCerrar, 350)
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={cerrar}
        style={{
          position: "fixed", inset: 0, zIndex: 1500,
          background: "rgba(33,46,92,0.6)",
          backdropFilter: "blur(3px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.35s ease"
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1600,
        width: "min(440px, 100vw)",
        backgroundColor: "#0f1923",
        display: "flex", flexDirection: "column",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: "-8px 0 50px rgba(0,0,0,0.5)"
      }}>

        {/* Header panel */}
        <div style={{
          background: "linear-gradient(135deg, #212E5C 0%, #094F8A 100%)",
          padding: "22px 20px",
          borderBottom: "3px solid #36F5AF",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{
                color: "white", margin: 0, fontFamily: "'Montserrat', sans-serif",
                fontWeight: "900", fontSize: "1.3rem", letterSpacing: "1px"
              }}>
                🛒 Mi Carrito
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", margin: "4px 0 0", fontSize: "0.83rem", fontFamily: "'Open Sans', sans-serif" }}>
                {totalItems === 0 ? "Carrito vacío" : `${totalItems} producto${totalItems > 1 ? "s" : ""} seleccionado${totalItems > 1 ? "s" : ""}`}
              </p>
            </div>
            <button
              onClick={cerrar}
              style={{
                background: "rgba(255,255,255,0.12)", border: "none",
                borderRadius: "50%", width: "36px", height: "36px",
                color: "white", fontSize: "1rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >✕</button>
          </div>
        </div>

        {/* Lista de items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {carrito.length === 0 ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", height: "100%", gap: "16px", textAlign: "center", padding: "40px 20px"
            }}>
              <div style={{ fontSize: "4rem", opacity: 0.25 }}>🍿</div>
              <p style={{ color: "#556", fontFamily: "'Open Sans', sans-serif", fontSize: "1rem", margin: 0 }}>
                Tu carrito está vacío
              </p>
              <p style={{ color: "#445", fontFamily: "'Open Sans', sans-serif", fontSize: "0.85rem", margin: 0 }}>
                Agrega alimentos desde la sección de Alimentos
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {carrito.map(item => (
                <CarritoItem
                  key={item.id}
                  item={item}
                  onActualizar={onActualizar}
                  onEliminar={onEliminar}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer con total */}
        {carrito.length > 0 && (
          <div style={{
            padding: "16px 20px",
            background: "linear-gradient(180deg, #111b27 0%, #0c1520 100%)",
            borderTop: "1px solid #1e2d40",
            flexShrink: 0
          }}>
            {/* Desglose */}
            <div style={{ marginBottom: "14px" }}>
              {carrito.map(item => (
                <div key={item.id} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "4px 0", fontFamily: "'Open Sans', sans-serif", fontSize: "0.82rem"
                }}>
                  <span style={{ color: "#778899" }}>{item.nombre} × {item.cantidad}</span>
                  <span style={{ color: "#aabbc" }}>${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 16px",
              background: "rgba(54,245,175,0.08)",
              borderRadius: "12px", marginBottom: "14px",
              border: "1px solid rgba(54,245,175,0.2)"
            }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "700", color: "white", fontSize: "1rem" }}>
                Total
              </span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "900", color: "#36F5AF", fontSize: "1.6rem" }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Botón confirmar pedido */}
            {!confirmando ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => setConfirmando(true)}
                  style={{
                    width: "100%", padding: "14px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #36F5AF, #2ed9a0)",
                    color: "#0a3d2b", border: "none", cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
                    fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(54,245,175,0.35)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                >
                  ✅ Confirmar pedido
                </button>
                <button
                  onClick={onVaciar}
                  style={{
                    width: "100%", padding: "10px",
                    borderRadius: "12px", background: "transparent",
                    color: "#ef4444", border: "1px solid #ef444444",
                    cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
                    fontWeight: "600", fontSize: "0.85rem",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  🗑️ Vaciar carrito
                </button>
              </div>
            ) : (
              <ConfirmacionPedido
                total={total}
                items={carrito}
                onFinalizar={() => { onVaciar(); cerrar() }}
                onCancelar={() => setConfirmando(false)}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

function CarritoItem({ item, onActualizar, onEliminar }) {
  return (
    <div style={{
      display: "flex", gap: "12px", alignItems: "center",
      padding: "12px", borderRadius: "12px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      transition: "background 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
    >
      <img
        src={item.imagen} alt={item.nombre}
        style={{
          width: "52px", height: "52px", objectFit: "cover",
          borderRadius: "8px", flexShrink: 0,
          border: "2px solid rgba(54,245,175,0.3)"
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
          color: "white", fontSize: "0.9rem",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        }}>{item.nombre}</p>
        <p style={{
          margin: "4px 0 0", fontFamily: "'Montserrat', sans-serif",
          fontWeight: "800", color: "#36F5AF", fontSize: "0.9rem"
        }}>${(item.precio * item.cantidad).toFixed(2)}</p>
      </div>

      {/* Controles cantidad */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <CantidadBtn onClick={() => onActualizar(item.id, item.cantidad - 1)} disabled={item.cantidad <= 1}>−</CantidadBtn>
        <span style={{
          color: "white", fontFamily: "'Montserrat', sans-serif",
          fontWeight: "800", fontSize: "1rem", minWidth: "20px", textAlign: "center"
        }}>{item.cantidad}</span>
        <CantidadBtn onClick={() => onActualizar(item.id, item.cantidad + 1)}>+</CantidadBtn>
        <button
          onClick={() => onEliminar(item.id)}
          style={{
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "6px", width: "28px", height: "28px", color: "#ef4444",
            cursor: "pointer", fontSize: "0.8rem", display: "flex",
            alignItems: "center", justifyContent: "center", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.28)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
        >✕</button>
      </div>
    </div>
  )
}

function CantidadBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "28px", height: "28px", borderRadius: "8px",
        background: disabled ? "rgba(255,255,255,0.04)" : "rgba(54,245,175,0.15)",
        border: disabled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(54,245,175,0.4)",
        color: disabled ? "#334" : "#36F5AF",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1.1rem", fontWeight: "700", display: "flex",
        alignItems: "center", justifyContent: "center",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(54,245,175,0.28)" }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "rgba(54,245,175,0.15)" }}
    >
      {children}
    </button>
  )
}

function ConfirmacionPedido({ total, items, onFinalizar, onCancelar }) {
  const [listo, setListo] = useState(false)

  const confirmar = () => {
    setListo(true)
    setTimeout(onFinalizar, 2500)
  }

  if (listo) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: "3rem", marginBottom: "10px", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
        <p style={{ color: "#36F5AF", fontFamily: "'Montserrat', sans-serif", fontWeight: "800", fontSize: "1.1rem", margin: "0 0 6px" }}>
          ¡Pedido confirmado!
        </p>
        <p style={{ color: "#778", fontFamily: "'Open Sans', sans-serif", fontSize: "0.85rem", margin: 0 }}>
          Tu pedido estará listo en sala
        </p>
        <style>{`@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{
        background: "rgba(54,245,175,0.06)", border: "1px solid rgba(54,245,175,0.2)",
        borderRadius: "10px", padding: "12px", marginBottom: "4px"
      }}>
        <p style={{ color: "#36F5AF", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "0.85rem", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Resumen del pedido
        </p>
        {items.map(i => (
          <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Open Sans', sans-serif", fontSize: "0.82rem", padding: "2px 0" }}>
            <span style={{ color: "#aab" }}>{i.nombre} ×{i.cantidad}</span>
            <span style={{ color: "white" }}>${(i.precio * i.cantidad).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(54,245,175,0.2)", marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "700" }}>Total</span>
          <span style={{ color: "#36F5AF", fontFamily: "'Montserrat', sans-serif", fontWeight: "900" }}>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={confirmar}
        style={{
          width: "100%", padding: "12px", borderRadius: "10px",
          background: "linear-gradient(135deg, #36F5AF, #2ed9a0)",
          color: "#0a3d2b", border: "none", cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
          fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px"
        }}
      >
        ✅ Pagar ${total.toFixed(2)}
      </button>
      <button
        onClick={onCancelar}
        style={{
          width: "100%", padding: "10px", borderRadius: "10px",
          background: "transparent", color: "#778", border: "1px solid #223",
          cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
          fontWeight: "600", fontSize: "0.85rem"
        }}
      >
        ← Volver
      </button>
    </div>
  )
}

export default PanelCarrito
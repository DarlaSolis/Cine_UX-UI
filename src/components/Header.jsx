import { useState, useEffect, useRef } from "react"

function Header({ cambiarVista, vistaActual, cantidadFavoritos, onAbrirFavoritos, cantidadCarrito, onAbrirCarrito }) {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastScrollY.current

      // Ocultar al bajar más de 8px, mostrar al subir
      if (diff > 8 && currentY > 80) {
        setVisible(false)
      } else if (diff < -4) {
        setVisible(true)
      }

      setScrolled(currentY > 20)
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      style={{
        width: "100%",
        background: scrolled
          ? "linear-gradient(135deg, rgba(33,46,92,0.97) 0%, rgba(9,79,138,0.97) 50%, rgba(12,93,140,0.97) 100%)"
          : "linear-gradient(135deg, #212E5C 0%, #094F8A 50%, #0C5D8C 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(33,46,92,0.45)" : "0 4px 15px rgba(33,46,92,0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: "3px solid #F9B21A",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease, background 0.3s ease"
      }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 28px", maxWidth: "1400px", margin: "0 auto",
        flexWrap: "wrap", gap: "14px"
      }}>
        {/* Logo */}
        <h1
          onClick={() => cambiarVista("home")}
          style={{
            margin: 0, cursor: "pointer",
            fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
            color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif",
            fontWeight: "900", textTransform: "uppercase", letterSpacing: "3px",
            textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            transition: "transform 0.3s ease", userSelect: "none"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
        >
          Ciné<span style={{ color: "#F9B21A" }}>polis</span>
        </h1>

        {/* Nav central */}
        <nav style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            ["home", "Inicio"],
            ["cartelera", "Cartelera"],
            ["alimento", "Alimentos"],
            ["otros", "Otros"]
          ].map(([vista, label]) => (
            <NavItem key={vista} vista={vista} actual={vistaActual} cambiarVista={cambiarVista}>
              {label}
            </NavItem>
          ))}
        </nav>

        {/* Botones acción */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Carrito */}
          <IconButton
            onClick={onAbrirCarrito}
            count={cantidadCarrito}
            color="#36F5AF"
            textColor="#0a3d2b"
            label="🛒"
            title="Carrito"
          />
          {/* Favoritos */}
          <IconButton
            onClick={onAbrirFavoritos}
            count={cantidadFavoritos}
            color="#F9B21A"
            textColor="#212E5C"
            label="❤️"
            title="Favoritos"
          />
        </div>
      </div>
    </header>
  )
}

function NavItem({ children, vista, actual, cambiarVista }) {
  const isActive = actual === vista
  return (
    <span
      onClick={() => cambiarVista(vista)}
      style={{
        cursor: "pointer", padding: "7px 16px", borderRadius: "25px",
        background: isActive ? "linear-gradient(135deg, #F9B21A, #FF9B00)" : "transparent",
        color: isActive ? "#212E5C" : "rgba(255,255,255,0.88)",
        fontWeight: isActive ? "800" : "500",
        boxShadow: isActive ? "0 4px 12px rgba(249,178,26,0.35)" : "none",
        transition: "all 0.25s ease",
        fontSize: "clamp(0.8rem, 2vw, 0.92rem)",
        border: "2px solid transparent",
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "uppercase", letterSpacing: "0.8px",
        userSelect: "none"
      }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(249,178,26,0.18)"; e.currentTarget.style.borderColor = "rgba(249,178,26,0.6)" }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent" }}}
    >
      {children}
    </span>
  )
}

function IconButton({ onClick, count, color, textColor, label, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        position: "relative", cursor: "pointer",
        padding: "8px 16px", borderRadius: "25px",
        background: `${color}22`,
        border: `2px solid ${color}66`,
        color: color, fontFamily: "'Montserrat', sans-serif",
        fontWeight: "700", fontSize: "0.88rem",
        textTransform: "uppercase", letterSpacing: "0.8px",
        transition: "all 0.25s ease",
        display: "flex", alignItems: "center", gap: "6px",
        whiteSpace: "nowrap"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}38`
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = `0 6px 16px ${color}33`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${color}22`
        e.currentTarget.style.borderColor = `${color}66`
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <span>{label}</span>
      <span>{title}</span>
      {count > 0 && (
        <span style={{
          backgroundColor: color, color: textColor,
          borderRadius: "50%", minWidth: "20px", height: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: "900", padding: "0 4px",
          boxShadow: `0 2px 8px ${color}66`,
          animation: "badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}

export default Header
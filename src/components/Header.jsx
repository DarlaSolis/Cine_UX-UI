import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"

// NavLink aplica automáticamente la clase "active" cuando la ruta coincide
const NAV_LINKS = [
  { to: "/",           label: "Inicio",    end: true  },
  { to: "/cartelera",  label: "Cartelera", end: false },
  { to: "/alimentos",  label: "Alimentos", end: false },
  { to: "/otros",      label: "Otros",     end: false },
  { to: "/socio-club", label: "Socio Club",end: false },
]

function Header({ cantidadFavoritos, onAbrirFavoritos, cantidadCarrito, onAbrirCarrito }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [visible,   setVisible]   = useState(true)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const lastScrollY = useRef(0)
  const navigate    = useNavigate()

  // Ocultar header al bajar, mostrar al subir
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      setVisible(currentY < lastScrollY.current || currentY < 60)
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => { setMenuOpen(false) }, [navigate])

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700",
    fontSize: "0.82rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: isActive ? "#F9B21A" : "rgba(255,255,255,0.65)",
    borderBottom: isActive ? "2px solid #F9B21A" : "2px solid transparent",
    paddingBottom: "4px",
    transition: "all 0.2s ease",
  })

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled
          ? "rgba(10,22,40,0.92)"
          : "linear-gradient(180deg, rgba(10,22,40,0.95) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,178,26,0.12)" : "none",
        padding: "0 28px",
        height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s, border 0.3s",
      }}>

        {/* Logo — NavLink a home */}
        <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "8px",
            background: "linear-gradient(135deg, #F9B21A, #FF9B00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontWeight: "900", color: "#1a1200",
            boxShadow: "0 4px 12px rgba(249,178,26,0.35)"
          }}>C</div>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
            fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "white", letterSpacing: "-0.5px"
          }}>
            Cine<span style={{ color: "#F9B21A" }}>polis</span>
          </span>
        </NavLink>

        {/* Navegación desktop — NavLink con indicación visual de activo */}
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end} style={navLinkStyle}
              onMouseEnter={e => { if (!e.currentTarget.style.color.includes("249")) e.currentTarget.style.color = "white" }}
              onMouseLeave={e => { /* NavLink restaura el estilo */ }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Acciones: favoritos, carrito, menú móvil */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>

          {/* Favoritos */}
          <ActionBtn
            onClick={onAbrirFavoritos}
            count={cantidadFavoritos}
            color="#F9B21A"
            textColor="#1a1200"
            emoji="❤️"
            title="Mis favoritos"
          />

          {/* Carrito */}
          <ActionBtn
            onClick={onAbrirCarrito}
            count={totalCarrito(cantidadCarrito)}
            color="#36F5AF"
            textColor="#0a3d2b"
            emoji="🛒"
            title="Mi carrito"
          />

          {/* Botón menú hamburguesa (móvil) */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="nav-mobile-btn"
            style={{
              display: "none",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px", width: "38px", height: "38px",
              color: "white", cursor: "pointer",
              flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px"
            }}
            aria-label="Menú"
          >
            <span style={{ width: "18px", height: "2px", background: menuOpen ? "transparent" : "white", transition: "all 0.2s" }} />
            <span style={{ width: "18px", height: "2px", background: "white", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,0)" : "none" }} />
            <span style={{ width: "18px", height: "2px", background: "white", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,0)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "68px", left: 0, right: 0, zIndex: 999,
          background: "rgba(10,22,40,0.97)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(249,178,26,0.15)",
          padding: "20px 28px 24px",
          animation: "fadeIn 0.2s ease"
        }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to} to={link.to} end={link.end}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "block", padding: "14px 0",
                textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
                fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px",
                color: isActive ? "#F9B21A" : "rgba(255,255,255,0.7)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              })}
            >
              {link.label}
              {link.to === "/" || link.to === "/cartelera" || link.to === "/alimentos" || link.to === "/otros" || link.to === "/socio-club" ? "" : ""}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function totalCarrito(n) { return n }

function ActionBtn({ onClick, count, color, textColor, emoji, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        position: "relative", background: `${color}18`,
        border: `1px solid ${color}40`, borderRadius: "10px",
        padding: "8px 14px", cursor: "pointer",
        color, fontFamily: "'Montserrat', sans-serif",
        fontWeight: "700", fontSize: "0.82rem",
        display: "flex", alignItems: "center", gap: "6px",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}30`; e.currentTarget.style.transform = "translateY(-1px)" }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.transform = "translateY(0)" }}
    >
      {emoji}
      {count > 0 && (
        <span style={{
          background: color, color: textColor,
          borderRadius: "50%", width: "18px", height: "18px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.68rem", fontWeight: "900",
          animation: "badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}

export default Header
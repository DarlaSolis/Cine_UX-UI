function Header({ cambiarVista, vistaActual }) {
  return (
    <header 
      style={{
        width: "100%",
        background: `linear-gradient(135deg, #212E5C 0%, #094F8A 50%, #0C5D8C 100%)`,
        boxShadow: "0 4px 15px rgba(33, 46, 92, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: `3px solid #F9B21A`
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <h1 
          style={{ 
            margin: 0, 
            cursor: "pointer",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            color: "#FFFFFF",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(33, 46, 92, 0.5)",
            transition: "transform 0.3s ease"
          }}
          onClick={() => cambiarVista("home")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Cine<span style={{ 
            color: "#F9B21A",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}>polis</span>
        </h1>

        <nav
          style={{
            display: "flex",
            gap: "clamp(12px, 3vw, 24px)",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <NavButton 
            vista="home"
            actual={vistaActual}
            cambiarVista={cambiarVista}
          >
            Inicio
          </NavButton>

          <NavButton 
            vista="cartelera"
            actual={vistaActual}
            cambiarVista={cambiarVista}
          >
            Cartelera
          </NavButton>

          <NavButton 
            vista="alimento"
            actual={vistaActual}
            cambiarVista={cambiarVista}
          >
            Alimentos
          </NavButton>

          <NavButton 
            vista="otros"
            actual={vistaActual}
            cambiarVista={cambiarVista}
          >
            Otros
          </NavButton>
        </nav>
      </div>
    </header>
  )
}

function NavButton({ children, vista, actual, cambiarVista }) {
  const isActive = actual === vista;
  
  return (
    <span 
      style={{
        cursor: "pointer",
        padding: "8px 20px",
        borderRadius: "25px",
        background: isActive 
          ? "linear-gradient(135deg, #F9B21A, #FF9B00)" 
          : "transparent",
        color: isActive ? "#212E5C" : "#FFFFFF",
        fontWeight: isActive ? "700" : "500",
        boxShadow: isActive ? "0 4px 10px rgba(249, 178, 26, 0.3)" : "none",
        transition: "all 0.3s ease",
        fontSize: "clamp(0.9rem, 3vw, 1rem)",
        border: "2px solid transparent",
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}
      onClick={() => cambiarVista(vista)}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.background = "rgba(249, 178, 26, 0.15)";
          e.target.style.border = "2px solid #F9B21A";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.background = "transparent";
          e.target.style.border = "2px solid transparent";
        }
      }}
    >
      {children}
    </span>
  )
}

export default Header
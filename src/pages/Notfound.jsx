import { Link, useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <div style={{ textAlign:"center", maxWidth:"480px" }}>

        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"clamp(5rem,15vw,9rem)", lineHeight:1, background:"linear-gradient(135deg,#F9B21A,#FF9B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"8px" }}>
          404
        </div>

        <div style={{ fontSize:"2.5rem", marginBottom:"20px" }}>🎬</div>

        <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"1.4rem", marginBottom:"12px", color:"white" }}>
          Función no encontrada
        </h2>

        <p style={{ color:"rgba(255,255,255,0.45)", fontFamily:"'Open Sans',sans-serif", lineHeight:"1.7", marginBottom:"36px", fontSize:"0.95rem" }}>
          La página que buscas no existe o fue movida.
        </p>

        <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
          <Link to="/" style={{ padding:"12px 28px", borderRadius:"25px", background:"linear-gradient(135deg,#F9B21A,#FF9B00)", color:"#1a1200", textDecoration:"none", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.9rem", textTransform:"uppercase", letterSpacing:"1px" }}>
            🏠 Ir al inicio
          </Link>
          <button onClick={() => navigate(-1)} style={{ padding:"11px 26px", borderRadius:"25px", background:"transparent", color:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.9rem", textTransform:"uppercase", letterSpacing:"1px", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.5)";e.currentTarget.style.color="white"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.2)";e.currentTarget.style.color="rgba(255,255,255,0.7)"}}
          >← Volver</button>
        </div>

        <div style={{ marginTop:"40px", display:"flex", gap:"24px", justifyContent:"center", flexWrap:"wrap" }}>
          {[["Cartelera","/cartelera"],["Alimentos","/alimentos"],["Otros","/otros"],["Socio Club","/socio-club"]].map(([label, to]) => (
            <Link key={to} to={to} style={{ color:"rgba(255,255,255,0.3)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.85rem", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#F9B21A"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}
            >{label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound
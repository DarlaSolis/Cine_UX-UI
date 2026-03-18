import { useState } from "react"

const categorias = [
  {
    id: "combos",
    nombre: "Combos Especiales",
    emoji: "🌟",
    items: [
      { id: 101, nombre: "Combo Dúo", precio: 149, imagen: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400&q=80", descripcion: "2 palomitas medianas + 2 refrescos" },
      { id: 102, nombre: "Combo Familia", precio: 229, imagen: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=400&q=80", descripcion: "1 palomita grande + 4 refrescos medianos" },
      { id: 103, nombre: "Combo Premium", precio: 189, imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", descripcion: "Palomita XL + refresco grande + nachos" },
      { id: 104, nombre: "Combo Snack", precio: 99, imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80", descripcion: "Palomita mediana + refresco mediano" }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    emoji: "🥤",
    items: [
      { id: 1, nombre: "Coca-Cola Grande", precio: 55, imagen: "https://static.vecteezy.com/system/resources/previews/002/181/631/large_2x/glass-of-soda-on-a-table-free-photo.jpg", descripcion: "750ml, helada" },
      { id: 2, nombre: "Agua Natural", precio: 35, imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80", descripcion: "500ml, agua purificada" },
      { id: 3, nombre: "Limonada Fresca", precio: 48, imagen: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", descripcion: "Con hielo, limón natural" },
      { id: 4, nombre: "Jugo de Naranja", precio: 52, imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80", descripcion: "Recién exprimido" }
    ]
  },
  {
    id: "comida",
    nombre: "Comida",
    emoji: "🌮",
    items: [
      { id: 5, nombre: "Hot Dog Clásico", precio: 65, imagen: "https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=400&q=80", descripcion: "Con aderezo y cebolla caramelizada" },
      { id: 6, nombre: "Nachos con Queso", precio: 79, imagen: "https://www.bekia.es/images/cocina/0000/607/2.jpg", descripcion: "Chips de maíz con queso fundido" },
      { id: 7, nombre: "Pizza Pepperoni", precio: 95, imagen: "https://www.sortirambnens.com/wp-content/uploads/2019/02/pizza-de-peperoni.jpg", descripcion: "2 rebanadas con doble pepperoni" },
      { id: 8, nombre: "Hamburguesa BBQ", precio: 115, imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", descripcion: "Carne 200g, queso cheddar, tocino" }
    ]
  },
  {
    id: "snacks",
    nombre: "Snacks & Dulces",
    emoji: "🍿",
    items: [
      { id: 9, nombre: "Palomitas Mantequilla", precio: 59, imagen: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80", descripcion: "Tamaño jumbo, recién hechas" },
      { id: 10, nombre: "Palomitas Caramelo", precio: 65, imagen: "https://img-global.cpcdn.com/recipes/3d9d2318bdcf19e5/1200x630cq80/photo.jpg", descripcion: "Cobertura de caramelo artesanal" },
      { id: 11, nombre: "Chocolates Surtidos", precio: 45, imagen: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80", descripcion: "Mix de chocolates importados" },
      { id: 12, nombre: "Gomitas Ácidas", precio: 38, imagen: "https://sinofudetechnology.com/wp-content/uploads/2024/11/f-2.png", descripcion: "Bolsa grande, varios sabores" }
    ]
  }
]

function Alimento({ onAgregarCarrito }) {
  const [categoriaActiva, setCategoriaActiva] = useState("combos")
  const [notificacion, setNotificacion] = useState(null)
  const [busqueda, setBusqueda] = useState("")

  const agregarItem = (item) => {
    onAgregarCarrito(item)
    setNotificacion(`🛒 ${item.nombre} agregado`)
    setTimeout(() => setNotificacion(null), 2000)
  }

  const categoriasMostrar = categorias.filter(c =>
    c.id === categoriaActiva || busqueda.length > 0
  )

  const itemsFiltrados = busqueda
    ? categorias.flatMap(c => c.items).filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : categorias.find(c => c.id === categoriaActiva)?.items || []

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a1628" }}>

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f2040 0%, #1a3a6b 50%, #0f2040 100%)",
        padding: "60px 28px 40px",
        textAlign: "center",
        borderBottom: "1px solid rgba(54,245,175,0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decoration circles */}
        <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,178,26,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle, rgba(54,245,175,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <p style={{ color: "#36F5AF", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 12px" }}>
          🍿 Dulcería Cinépolis
        </p>
        <h1 style={{
          color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
          fontSize: "clamp(1.8rem, 5vw, 3rem)", margin: "0 0 12px", letterSpacing: "-0.5px"
        }}>
          Alimentos & Bebidas
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Open Sans', sans-serif", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 28px" }}>
          Haz tu experiencia en el cine aún más especial
        </p>

        {/* Búsqueda */}
        <div style={{ maxWidth: "380px", margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px 12px 44px",
              borderRadius: "50px", border: "1.5px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)", color: "white",
              fontFamily: "'Open Sans', sans-serif", fontSize: "0.95rem",
              outline: "none", boxSizing: "border-box",
              backdropFilter: "blur(8px)", transition: "border-color 0.2s"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(54,245,175,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
          />
        </div>
      </div>

      {/* Tabs de categorías */}
      {!busqueda && (
        <div style={{
          display: "flex", gap: "0", overflowX: "auto",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "#0d1e35", padding: "0 20px",
          scrollbarWidth: "none"
        }}>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              style={{
                padding: "16px 22px", border: "none", cursor: "pointer",
                background: "transparent", whiteSpace: "nowrap",
                fontFamily: "'Montserrat', sans-serif", fontWeight: "700",
                fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.8px",
                color: categoriaActiva === cat.id ? "#36F5AF" : "rgba(255,255,255,0.4)",
                borderBottom: categoriaActiva === cat.id ? "3px solid #36F5AF" : "3px solid transparent",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={e => { if (categoriaActiva !== cat.id) e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
              onMouseLeave={e => { if (categoriaActiva !== cat.id) e.currentTarget.style.color = "rgba(255,255,255,0.4)" }}
            >
              {cat.emoji} {cat.nombre}
            </button>
          ))}
        </div>
      )}

      {/* Grid de productos */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px" }}>
        {busqueda && (
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif", marginBottom: "20px", fontSize: "0.9rem" }}>
            {itemsFiltrados.length} resultado{itemsFiltrados.length !== 1 ? "s" : ""} para "<strong style={{ color: "white" }}>{busqueda}</strong>"
          </p>
        )}

        {itemsFiltrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)", fontFamily: "'Open Sans', sans-serif" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
            <p>Sin resultados para "{busqueda}"</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px"
          }}>
            {itemsFiltrados.map((item, i) => (
              <ProductCard
                key={item.id}
                item={item}
                onAgregar={agregarItem}
                delay={i * 50}
              />
            ))}
          </div>
        )}
      </div>

      {/* Notificación flotante */}
      {notificacion && (
        <div style={{
          position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #36F5AF, #2ed9a0)",
          color: "#0a3d2b", padding: "12px 28px", borderRadius: "50px",
          fontFamily: "'Montserrat', sans-serif", fontWeight: "800", fontSize: "0.9rem",
          boxShadow: "0 8px 24px rgba(54,245,175,0.4)",
          zIndex: 1400, whiteSpace: "nowrap",
          animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          {notificacion}
        </div>
      )}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

function ProductCard({ item, onAgregar, delay }) {
  const [hovered, setHovered] = useState(false)
  const [agregando, setAgregando] = useState(false)

  const handleAgregar = () => {
    setAgregando(true)
    onAgregar(item)
    setTimeout(() => setAgregando(false), 600)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(54,245,175,0.35)" : "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "0 4px 16px rgba(0,0,0,0.2)",
        animation: `fadeUp 0.5s ease-out ${delay}ms both`
      }}
    >
      {/* Imagen */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)"
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 60%)"
        }} />
        <div style={{
          position: "absolute", bottom: "12px", left: "14px",
          fontFamily: "'Montserrat', sans-serif", fontWeight: "900",
          color: "#36F5AF", fontSize: "1.2rem"
        }}>
          ${item.precio}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{
          margin: "0 0 6px", color: "white", fontFamily: "'Montserrat', sans-serif",
          fontWeight: "700", fontSize: "0.95rem"
        }}>{item.nombre}</h3>
        <p style={{
          margin: "0 0 14px", color: "rgba(255,255,255,0.4)",
          fontFamily: "'Open Sans', sans-serif", fontSize: "0.82rem", lineHeight: "1.4"
        }}>{item.descripcion}</p>

        <button
          onClick={handleAgregar}
          style={{
            width: "100%", padding: "10px",
            borderRadius: "10px",
            background: agregando
              ? "rgba(54,245,175,0.2)"
              : "linear-gradient(135deg, rgba(54,245,175,0.15), rgba(54,245,175,0.08))",
            border: `1.5px solid ${agregando ? "#36F5AF" : "rgba(54,245,175,0.35)"}`,
            color: "#36F5AF", cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontWeight: "800",
            fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.8px",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={e => { if (!agregando) { e.currentTarget.style.background = "rgba(54,245,175,0.22)"; e.currentTarget.style.borderColor = "#36F5AF" }}}
          onMouseLeave={e => { if (!agregando) { e.currentTarget.style.background = "linear-gradient(135deg, rgba(54,245,175,0.15), rgba(54,245,175,0.08))"; e.currentTarget.style.borderColor = "rgba(54,245,175,0.35)" }}}
        >
          {agregando ? "✓ Agregado" : "+ Agregar al carrito"}
        </button>
      </div>
    </div>
  )
}

export default Alimento
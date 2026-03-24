import { useState } from "react"

const categorias = [
  {
    id: "combos", nombre: "Combos Especiales", emoji: "🌟",
    items: [
      { id:101, nombre:"Combo Dúo",     precio:149, imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQPABjaAgECs1kcQwlEbN2tD0bR5t2b4JDw&s", descripcion:"2 palomitas medianas + 2 refrescos",
        opciones: { tamaño: null, sabores: null, extras: ["Mantequilla extra","Queso extra","Jalapeños"] } },
      { id:102, nombre:"Combo Familia", precio:229, imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9l3YBaygvcE9rfsDgIyeT-9f7hstTxmA51Q&s", descripcion:"1 palomita grande + 4 refrescos",
        opciones: { tamaño: null, sabores: null, extras: ["Mantequilla extra","Queso extra","Salsa valentina"] } },
      { id:103, nombre:"Combo Premium", precio:189, imagen:"https://tofuu.getjusto.com/orioneat-local/resized2/ocL2JvWJg5rqqerZa-300-x.webp", descripcion:"Palomita XL + refresco grande + nachos",
        opciones: { tamaño: null, sabores: null, extras: ["Guacamole","Jalapeños","Queso extra"] } },
      { id:104, nombre:"Combo Snack",   precio:99,  imagen:"https://tofuu.getjusto.com/orioneat-local/resized2/444mtNHv8M7BLT99A-300-x.webp", descripcion:"Palomita mediana + refresco mediano",
        opciones: { tamaño: null, sabores: null, extras: ["Mantequilla extra","Chamoy"] } },
    ]
  },
  {
    id: "bebidas", nombre: "Bebidas", emoji: "🥤",
    items: [
      { id:1, nombre:"Refresco",       precio:45, imagen:"https://static.vecteezy.com/system/resources/previews/002/181/631/large_2x/glass-of-soda-on-a-table-free-photo.jpg", descripcion:"Helado, con hielo",
        opciones: { tamaño:["Mediano +$0","Grande +$15","XL +$25"], sabores:["Coca-Cola","Pepsi","Sprite","Fanta Naranja","Fanta Uva","Agua Mineral"], extras:["Sin hielo","Limón","Hielo extra"] } },
      { id:2, nombre:"Agua Natural",   precio:30, imagen:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80", descripcion:"500ml purificada",
        opciones: { tamaño:["500ml +$0","1L +$20"], sabores:null, extras:["Con limón","Con pepino"] } },
      { id:3, nombre:"Limonada",       precio:48, imagen:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", descripcion:"Limón natural, hielo",
        opciones: { tamaño:["Mediana +$0","Grande +$18"], sabores:["Natural","Mineral","Rosa (Jamaica)"], extras:["Sin azúcar","Hielo extra","Chía +$5"] } },
      { id:4, nombre:"Jugo de Naranja",precio:52, imagen:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80", descripcion:"Recién exprimido",
        opciones: { tamaño:["Vaso +$0","Grande +$22"], sabores:null, extras:["Con jengibre","Sin pulpa","Con pulpa extra"] } },
    ]
  },
  {
    id: "comida", nombre: "Comida", emoji: "🌮",
    items: [
      { id:5, nombre:"Hot Dog",        precio:65, imagen:"https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=400&q=80", descripcion:"Con aderezo y cebolla caramelizada",
        opciones: { tamaño:null, sabores:["Clásico","BBQ","Hawaiano (piña)","Especial (tocino)"], extras:["Jalapeños","Cebolla extra","Mostaza","Kétchup","Mayonesa"] } },
      { id:6, nombre:"Nachos",         precio:79, imagen:"https://static.bainet.es/clip/7e5b398d-de64-4ae6-9d13-0ee58e42c008_source-aspect-ratio_1600w_0.jpg", descripcion:"Chips de maíz artesanal",
        opciones: { tamaño:["Individual +$0","Familiar +$35"], sabores:null, extras:["Queso extra +$12","Guacamole +$15","Jalapeños +$8","Salsa verde +$8","Frijoles +$10"] } },
      { id:7, nombre:"Pizza",          precio:95, imagen:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", descripcion:"2 rebanadas",
        opciones: { tamaño:null, sabores:["Pepperoni","Queso","Hawaiana","Mexicana","Veggie"], extras:["Orilla de queso +$18","Jalapeños +$8","Champiñones +$10"] } },
      { id:8, nombre:"Hamburguesa",    precio:115, imagen:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", descripcion:"Carne 200g",
        opciones: { tamaño:null, sabores:["Clásica","BBQ","Doble carne +$30","Veggie"], extras:["Tocino +$15","Huevo +$12","Aros de cebolla +$18","Sin cebolla","Sin jitomate"] } },
    ]
  },
  {
    id: "snacks", nombre: "Snacks & Dulces", emoji: "🍿",
    items: [
      { id:9, nombre:"Palomitas",       precio:55, imagen:"https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80", descripcion:"Recién hechas",
        opciones: { tamaño:["Mediana +$0","Grande +$20","Jumbo +$35","XL +$50"], sabores:["Mantequilla","Caramelo","Sal","Sin sal","Chile y limón","Queso"], extras:["Mantequilla extra +$8","Chamoy +$5","Valentina +$5"] } },
      { id:10, nombre:"Churros",        precio:48, imagen:"https://www.recipetineats.com/tachyon/2016/08/Churros_9-SQ.jpg", descripcion:"Crujientes con azúcar",
        opciones: { tamaño:["3 pzas +$0","5 pzas +$20"], sabores:null, extras:["Cajeta +$10","Chocolate +$10","Nutella +$15","Mermelada fresa +$8"] } },
      { id:11, nombre:"Chocolates",     precio:45, imagen:"https://phantom-expansion.unidadeditorial.es/ddfc15762273bc3d19fced5883f5dd7b/f/jpg/assets/multimedia/imagenes/2023/09/12/16945087962826.png", descripcion:"Mix surtido",
        opciones: { tamaño:["Bolsa chica +$0","Bolsa grande +$25"], sabores:["Surtido","Solo oscuro","Solo leche","Solo blanco"], extras:null } },
      { id:12, nombre:"Gomitas",        precio:38, imagen:"https://m.media-amazon.com/images/I/81E-5+BrQ3L._AC_UF894,1000_QL80_.jpg", descripcion:"Varios sabores",
        opciones: { tamaño:["Bolsa regular +$0","Bolsa grande +$20"], sabores:["Ácidas","Dulces","Mixtas","Solo rojas"], extras:["Chamoy +$5","Chile piquín +$5"] } },
    ]
  },
]

// ─── Modal de personalización del producto ────────────────────────────────────
function ModalProducto({ item, onAgregar, onCerrar }) {
  const [visible, setVisible]   = useState(false)
  const [tamaño, setTamaño]     = useState(item.opciones.tamaño?.[0] || null)
  const [sabor, setSabor]       = useState(item.opciones.sabores?.[0] || null)
  const [extras, setExtras]     = useState([])

  // Precio base + extras del tamaño
  const precioTamaño = tamaño ? parseInt((tamaño.match(/\+\$(\d+)/) || [0,0])[1]) : 0
  const precioExtras = extras.reduce((acc, e) => {
    const match = e.match(/\+\$(\d+)/)
    return acc + (match ? parseInt(match[1]) : 0)
  }, 0)
  const totalItem = item.precio + precioTamaño + precioExtras

  useState(() => { setTimeout(() => setVisible(true), 10) })

  const cerrar = () => { setVisible(false); setTimeout(onCerrar, 280) }

  const toggleExtra = (extra) =>
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra])

  const confirmar = () => {
    const nombre = [
      item.nombre,
      sabor ? `(${sabor.replace(/ \+\$\d+/,"")})` : "",
      tamaño ? tamaño.replace(/ \+\$\d+/,"") : ""
    ].filter(Boolean).join(" ")
    onAgregar({ ...item, nombre, precio: totalItem, extras })
    cerrar()
  }

  return (
    <>
      <div onClick={cerrar} style={{ position:"fixed", inset:0, zIndex:1500, background:"rgba(10,22,40,0.82)", backdropFilter:"blur(5px)", opacity: visible ? 1 : 0, transition:"opacity 0.28s" }} />
      <div style={{ position:"fixed", inset:0, zIndex:1600, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", pointerEvents:"none" }}>
        <div onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:"480px", maxHeight:"90vh", overflowY:"auto", background:"#0d1e35", borderRadius:"20px", border:"1px solid rgba(249,178,26,0.2)", boxShadow:"0 30px 80px rgba(0,0,0,0.6)", pointerEvents:"all", transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(30px)", transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>

          {/* Header */}
          <div style={{ display:"flex", gap:"14px", alignItems:"center", padding:"20px", background:"linear-gradient(135deg,#212E5C,#094F8A)", borderRadius:"20px 20px 0 0", borderBottom:"2px solid #F9B21A" }}>
            <img src={item.imagen} alt={item.nombre} style={{ width:"56px", height:"56px", objectFit:"cover", borderRadius:"10px", border:"2px solid rgba(249,178,26,0.4)", flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <h3 style={{ margin:0, color:"white", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"1.05rem" }}>{item.nombre}</h3>
              <p style={{ margin:"3px 0 0", color:"rgba(255,255,255,0.45)", fontSize:"0.82rem", fontFamily:"'Open Sans',sans-serif" }}>{item.descripcion}</p>
            </div>
            <button onClick={cerrar} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:"50%", width:"32px", height:"32px", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"0.9rem" }}>✕</button>
          </div>

          <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"20px" }}>

            {/* Tamaño */}
            {item.opciones.tamaño && (
              <div>
                <p style={{ margin:"0 0 10px", color:"rgba(255,255,255,0.4)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"1.5px" }}>Tamaño</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {item.opciones.tamaño.map(t => (
                    <label key={t} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", borderRadius:"10px", cursor:"pointer", background: tamaño===t ? "rgba(249,178,26,0.1)" : "rgba(255,255,255,0.03)", border:`1.5px solid ${tamaño===t ? "#F9B21A" : "rgba(255,255,255,0.08)"}`, transition:"all 0.18s" }}>
                      <input type="radio" name={`tam-${item.id}`} checked={tamaño===t} onChange={()=>setTamaño(t)} style={{ accentColor:"#F9B21A", width:"16px", height:"16px" }} />
                      <span style={{ color: tamaño===t ? "#F9B21A" : "rgba(255,255,255,0.65)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.88rem", flex:1 }}>{t.replace(/ \+\$\d+/,"")}</span>
                      <span style={{ color: tamaño===t ? "#F9B21A" : "rgba(255,255,255,0.3)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.8rem" }}>{t.includes("+$0") ? "Incluido" : t.match(/\+\$\d+/)?.[0]}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Sabor */}
            {item.opciones.sabores && (
              <div>
                <p style={{ margin:"0 0 10px", color:"rgba(255,255,255,0.4)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"1.5px" }}>Sabor / Variante</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {item.opciones.sabores.map(s => (
                    <button key={s} onClick={()=>setSabor(s)} style={{ padding:"7px 14px", borderRadius:"20px", cursor:"pointer", background: sabor===s ? "rgba(9,79,138,0.5)" : "rgba(255,255,255,0.04)", border:`1.5px solid ${sabor===s ? "#5bb8f5" : "rgba(255,255,255,0.1)"}`, color: sabor===s ? "#5bb8f5" : "rgba(255,255,255,0.5)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.84rem", transition:"all 0.18s" }}>
                      {s.replace(/ \+\$\d+/,"")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {item.opciones.extras && (
              <div>
                <p style={{ margin:"0 0 10px", color:"rgba(255,255,255,0.4)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"1.5px" }}>Extras <span style={{ color:"rgba(255,255,255,0.2)", fontWeight:"400", textTransform:"none" }}>(opcional)</span></p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {item.opciones.extras.map(e => {
                    const activo = extras.includes(e)
                    const costo  = e.match(/\+\$(\d+)/)?.[1]
                    return (
                      <label key={e} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"9px 14px", borderRadius:"10px", cursor:"pointer", background: activo ? "rgba(54,245,175,0.08)" : "rgba(255,255,255,0.03)", border:`1.5px solid ${activo ? "rgba(54,245,175,0.4)" : "rgba(255,255,255,0.07)"}`, transition:"all 0.18s" }}>
                        <input type="checkbox" checked={activo} onChange={()=>toggleExtra(e)} style={{ accentColor:"#36F5AF", width:"16px", height:"16px" }} />
                        <span style={{ color: activo ? "#36F5AF" : "rgba(255,255,255,0.6)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.86rem", flex:1 }}>{e.replace(/ \+\$\d+/,"")}</span>
                        {costo && <span style={{ color: activo ? "#36F5AF" : "rgba(255,255,255,0.25)", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.78rem" }}>+${costo}</span>}
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Total + botón */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <span style={{ color:"rgba(255,255,255,0.4)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.85rem" }}>Total del producto</span>
                <span style={{ color:"#36F5AF", fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"1.5rem" }}>${totalItem}</span>
              </div>
              <button onClick={confirmar} style={{ width:"100%", padding:"13px", borderRadius:"12px", background:"linear-gradient(135deg,#36F5AF,#2ed9a0)", color:"#0a3d2b", border:"none", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"0.95rem", textTransform:"uppercase", letterSpacing:"1px", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 20px rgba(54,245,175,0.35)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
              >
                🛒 Agregar al carrito · ${totalItem}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Tarjeta de producto ──────────────────────────────────────────────────────
function ProductCard({ item, onAgregarCarrito, delay }) {
  const [hovered, setHovered]     = useState(false)
  const [modalAbierto, setModal]  = useState(false)

  const tieneOpciones = Object.values(item.opciones).some(v => v && v.length > 0)

  const handleClick = () => {
    if (tieneOpciones) setModal(true)
    else onAgregarCarrito(item)
  }

  return (
    <>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ borderRadius:"16px", overflow:"hidden", background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", border:`1px solid ${hovered ? "rgba(249,178,26,0.35)" : "rgba(255,255,255,0.07)"}`, transition:"all 0.3s ease", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "0 4px 16px rgba(0,0,0,0.2)", animation:`fadeUp 0.5s ease-out ${delay}ms both` }}>

        <div style={{ position:"relative", height:"170px", overflow:"hidden" }}>
          <img src={item.imagen} alt={item.nombre} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform: hovered ? "scale(1.08)" : "scale(1)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 55%)" }} />
          <div style={{ position:"absolute", bottom:"12px", left:"14px", fontFamily:"'Montserrat',sans-serif", fontWeight:"900", color:"#36F5AF", fontSize:"1.2rem", textShadow:"0 2px 8px rgba(0,0,0,0.5)" }}>
            ${item.precio}
          </div>
          {tieneOpciones && (
            <div style={{ position:"absolute", top:"10px", right:"10px", background:"rgba(249,178,26,0.9)", borderRadius:"20px", padding:"3px 9px", fontSize:"0.65rem", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", color:"#1a1200", letterSpacing:"0.5px" }}>
              PERSONALIZABLE
            </div>
          )}
        </div>

        <div style={{ padding:"13px 14px 15px" }}>
          <h3 style={{ margin:"0 0 5px", color:"white", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.92rem" }}>{item.nombre}</h3>
          <p style={{ margin:"0 0 12px", color:"rgba(255,255,255,0.35)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.8rem", lineHeight:"1.4" }}>{item.descripcion}</p>

          {/* Preview de opciones */}
          {tieneOpciones && (
            <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"12px" }}>
              {item.opciones.tamaño  && <Tag>📏 {item.opciones.tamaño.length} tamaños</Tag>}
              {item.opciones.sabores && <Tag>🎨 {item.opciones.sabores.length} sabores</Tag>}
              {item.opciones.extras  && <Tag>➕ {item.opciones.extras.length} extras</Tag>}
            </div>
          )}

          <button onClick={handleClick} style={{ width:"100%", padding:"10px", borderRadius:"10px", background: tieneOpciones ? "linear-gradient(135deg,rgba(54,245,175,0.15),rgba(54,245,175,0.08))" : "linear-gradient(135deg,rgba(54,245,175,0.15),rgba(54,245,175,0.08))", border:`1.5px solid ${tieneOpciones ? "rgba(54,245,175,0.45)" : "rgba(54,245,175,0.35)"}`, color:"#36F5AF", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.8px", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(54,245,175,0.22)";e.currentTarget.style.borderColor="#36F5AF"}}
            onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(54,245,175,0.15),rgba(54,245,175,0.08))";e.currentTarget.style.borderColor="rgba(54,245,175,0.35)"}}
          >
            {tieneOpciones ? "⚙️ Personalizar y agregar" : "+ Agregar al carrito"}
          </button>
        </div>
      </div>

      {modalAbierto && (
        <ModalProducto
          item={item}
          onAgregar={itemPersonalizado => { onAgregarCarrito(itemPersonalizado); setModal(false) }}
          onCerrar={() => setModal(false)}
        />
      )}
    </>
  )
}

function Tag({ children }) {
  return (
    <span style={{ padding:"2px 8px", borderRadius:"20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.35)", fontSize:"0.7rem", fontFamily:"'Open Sans',sans-serif" }}>
      {children}
    </span>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────
function Alimento({ onAgregarCarrito }) {
  const [categoriaActiva, setCategoriaActiva] = useState("combos")
  const [busqueda, setBusqueda]               = useState("")
  const [notificacion, setNotificacion]       = useState(null)

  const agregarItem = (item) => {
    onAgregarCarrito(item)
    setNotificacion(`🛒 ${item.nombre} agregado`)
    setTimeout(() => setNotificacion(null), 2200)
  }

  const itemsFiltrados = busqueda
    ? categorias.flatMap(c => c.items).filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : categorias.find(c => c.id === categoriaActiva)?.items || []

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="page-hero">
        <span className="eyebrow">🍿 Dulcería Cinépolis</span>
        <h1>Alimentos & Bebidas</h1>
        <p>Personaliza tu pedido a tu gusto</p>

        <div style={{ maxWidth:"380px", margin:"0 auto", position:"relative" }}>
          <span style={{ position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)" }}>🔍</span>
          <input type="text" placeholder="Buscar producto..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            style={{ width:"100%", padding:"12px 16px 12px 44px", borderRadius:"50px", border:"1.5px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", color:"white", fontFamily:"'Open Sans',sans-serif", fontSize:"0.95rem", outline:"none", boxSizing:"border-box", backdropFilter:"blur(8px)", transition:"border-color 0.2s" }}
            onFocus={e=>e.target.style.borderColor="rgba(54,245,175,0.6)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"}
          />
        </div>
      </div>

      {!busqueda && (
        <div style={{ display:"flex", gap:"0", overflowX:"auto", borderBottom:"1px solid rgba(255,255,255,0.06)", backgroundColor:"#0d1e35", padding:"0 20px", scrollbarWidth:"none" }}>
          {categorias.map(cat => (
            <button key={cat.id} onClick={()=>setCategoriaActiva(cat.id)}
              style={{ padding:"15px 22px", border:"none", cursor:"pointer", background:"transparent", whiteSpace:"nowrap", fontFamily:"'Montserrat',sans-serif", fontWeight:"700", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.8px", color: categoriaActiva===cat.id ? "#36F5AF" : "rgba(255,255,255,0.38)", borderBottom: categoriaActiva===cat.id ? "3px solid #36F5AF" : "3px solid transparent", transition:"all 0.25s" }}>
              {cat.emoji} {cat.nombre}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth:"1300px", margin:"0 auto", padding:"32px 24px" }}>
        {busqueda && <p style={{ color:"rgba(255,255,255,0.35)", marginBottom:"20px", fontSize:"0.88rem", fontFamily:"'Open Sans',sans-serif" }}>{itemsFiltrados.length} resultado{itemsFiltrados.length!==1?"s":""} para "<strong style={{color:"white"}}>{busqueda}</strong>"</p>}

        {itemsFiltrados.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(255,255,255,0.25)", fontFamily:"'Open Sans',sans-serif" }}>
            <div style={{ fontSize:"3rem", marginBottom:"12px" }}>🔍</div>
            <p>Sin resultados para "{busqueda}"</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"20px" }}>
            {itemsFiltrados.map((item, i) => (
              <ProductCard key={item.id} item={item} onAgregarCarrito={agregarItem} delay={i*50} />
            ))}
          </div>
        )}
      </div>

      {notificacion && (
        <div style={{ position:"fixed", bottom:"28px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#36F5AF,#2ed9a0)", color:"#0a3d2b", padding:"12px 28px", borderRadius:"50px", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.88rem", boxShadow:"0 8px 24px rgba(54,245,175,0.4)", zIndex:1400, whiteSpace:"nowrap", animation:"toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          {notificacion}
        </div>
      )}

      <style>{`
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(20px) scale(0.9)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
      `}</style>
    </div>
  )
}

export default Alimento
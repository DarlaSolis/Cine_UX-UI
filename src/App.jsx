import { useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

import Header        from "./components/Header"
import Home          from "./pages/Home"
import Cartelera     from "./pages/Cartelera"
import Detalle       from "./pages/Detalle"
import Alimento      from "./pages/Alimento"
import Otros         from "./pages/Otros"
import Promociones   from "./pages/Promociones"
import SocioClub     from "./pages/SocioClub"
import NotFound      from "./pages/Notfound"

import ModalCompra    from "./components/ModalCompra"
import PanelFavoritos from "./components/Panelfavoritos"
import PanelCarrito   from "./components/PanelCarrito"
import Footer         from "./components/Footer"

import "./App.css"

function App() {
  const navigate = useNavigate()

  // ── Favoritos globales ──────────────────────────────────────────
  const [favoritos, setFavoritos]            = useState([])
  const [panelFavoritosAbierto, setPanelFav] = useState(false)

  const toggleFavorito = (pelicula) => {
    setFavoritos(prev => {
      const existe = prev.find(f => f.title === pelicula.title)
      if (existe) return prev.filter(f => f.title !== pelicula.title)
      return [...prev, { ...pelicula, favId: Date.now() }]
    })
  }

  const eliminarFavorito = (favId) =>
    setFavoritos(prev => prev.filter(f => f.favId !== favId))

  const esFavorito = (title) => favoritos.some(f => f.title === title)

  // ── Modal compra ────────────────────────────────────────────────
  const [peliculaModal, setPeliculaModal] = useState(null)
  const [modalAbierto, setModalAbierto]   = useState(false)
  const abrirModal  = (p) => { setPeliculaModal(p); setModalAbierto(true) }
  const cerrarModal = ()  => { setModalAbierto(false); setTimeout(() => setPeliculaModal(null), 300) }

  // ── Carrito ─────────────────────────────────────────────────────
  const [carrito, setCarrito]                  = useState([])
  const [panelCarritoAbierto, setPanelCarrito] = useState(false)

  const agregarAlCarrito = (item) =>
    setCarrito(prev => {
      const existe = prev.find(i => i.id === item.id)
      return existe
        ? prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...prev, { ...item, cantidad: 1 }]
    })

  const totalCarrito = carrito.reduce((acc, i) => acc + i.cantidad, 0)

  // Props compartidos para páginas con películas
  const movieProps = {
    onComprar:        abrirModal,
    onToggleFavorito: toggleFavorito,
    esFavorito,
  }

  return (
    <div className="App">

      {/* Header usa NavLink internamente — ya no necesita cambiarVista ni vistaActual */}
      <Header
        cantidadFavoritos={favoritos.length}
        onAbrirFavoritos={() => setPanelFav(true)}
        cantidadCarrito={totalCarrito}
        onAbrirCarrito={() => setPanelCarrito(true)}
      />

      <div className="page-wrapper">
        <Routes>
          {/* Página principal */}
          <Route path="/"             element={<Home      {...movieProps} />} />

          {/* Cartelera completa */}
          <Route path="/cartelera"    element={<Cartelera {...movieProps} />} />

          {/* Ruta dinámica — Detalle usa useParams para leer :id */}
          <Route path="/pelicula/:id" element={<Detalle   onComprar={abrirModal} />} />

          {/* Resto de páginas */}
          <Route path="/alimentos"    element={<Alimento  onAgregarCarrito={agregarAlCarrito} />} />
          <Route path="/otros"        element={<Otros />} />
          <Route path="/promociones"  element={<Promociones />} />
          <Route path="/socio-club"   element={<SocioClub />} />

          {/* Redireciones de rutas anteriores por compatibilidad */}
          <Route path="/home"         element={<Navigate to="/" replace />} />
          <Route path="/socio"        element={<Navigate to="/socio-club" replace />} />

          {/* 404 — cualquier ruta no reconocida */}
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </div>

      <Footer />

      {/* ── Overlays globales — sin cambios respecto al original ── */}
      {modalAbierto && peliculaModal && (
        <ModalCompra
          pelicula={peliculaModal}
          onComprar={d => console.log("Compra:", d)}
          onCerrar={cerrarModal}
        />
      )}

      {panelFavoritosAbierto && (
        <PanelFavoritos
          favoritos={favoritos}
          onEliminar={eliminarFavorito}
          onCerrar={() => setPanelFav(false)}
          onVerDetalle={p => {
            navigate(`/pelicula/${p.id || encodeURIComponent(p.title)}`, { state: { pelicula: p } })
            setPanelFav(false)
          }}
        />
      )}

      {panelCarritoAbierto && (
        <PanelCarrito
          carrito={carrito}
          onActualizar={(id, c) =>
            c <= 0
              ? setCarrito(p => p.filter(i => i.id !== id))
              : setCarrito(p => p.map(i => i.id === id ? { ...i, cantidad: c } : i))
          }
          onEliminar={id => setCarrito(p => p.filter(i => i.id !== id))}
          onVaciar={() => setCarrito([])}
          onCerrar={() => setPanelCarrito(false)}
        />
      )}
    </div>
  )
}

export default App
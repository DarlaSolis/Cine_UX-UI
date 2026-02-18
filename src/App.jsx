import { useState } from "react"
import Header from "./components/Header"
import Home from "./pages/Home"
import Cartelera from "./pages/Cartelera"
import Detalle from "./pages/Detalle"
import Alimento from "./pages/Alimento"
import Otros from "./pages/Otros"
import "./App.css"

function App() {
  const [vistaActual, setVistaActual] = useState("home")
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null)

  const handleVerDetalle = (pelicula) => {
    setPeliculaSeleccionada(pelicula)
    setVistaActual("detalle")
  }

  return (
    <div className="app">
      <Header cambiarVista={setVistaActual} vistaActual={vistaActual} />
      
      <main className="main-content">
        {vistaActual === "home" && (
          <Home 
            cambiarVista={setVistaActual} 
            onVerDetalle={handleVerDetalle}
          />
        )}
        {vistaActual === "cartelera" && (
          <Cartelera 
            cambiarVista={setVistaActual}
            onVerDetalle={handleVerDetalle}
          />
        )}
        {vistaActual === "detalle" && (
          <Detalle pelicula={peliculaSeleccionada} />
        )}
        {vistaActual === "alimento" && <Alimento />}
        {vistaActual === "otros" && <Otros />}
      </main>
    </div>
  )
}

export default App
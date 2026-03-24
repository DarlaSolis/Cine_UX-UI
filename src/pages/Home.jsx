import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import PromocionesAPI from "../components/PromocionesAPI"
import Carousel from "../components/Carousel"
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_URL, PELICULAS } from "../Peliculas.config"

const GENEROS_MAP = {
  28:"Acción", 12:"Aventura", 16:"Animación", 35:"Comedia", 80:"Crimen",
  99:"Documental", 18:"Drama", 10751:"Familia", 14:"Fantasía", 36:"Historia",
  27:"Terror", 10402:"Música", 9648:"Misterio", 10749:"Romance",
  878:"Ciencia ficción", 53:"Suspenso", 10752:"Bélica", 37:"Western"
}

const CAROUSEL_ITEMS = [
  {
    title: "¡Castor al rescate!",
    description: "Una aventura animada que mezcla tecnología, naturaleza y un mensaje ecológico.",
    buttonText: "Comprar boletos",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    background: "linear-gradient(90deg, #800080 0%, #000033 100%)",
    badge: "Garantía Cinépolis"
  },
  {
    title: "Estrenos de la Semana",
    description: "No te pierdas las mejores historias en la pantalla más grande.",
    buttonText: "Ver funciones",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    background: "linear-gradient(90deg, #001227 0%, #004e92 100%)",
    badge: "Estreno"
  },
  {
    title: "Socio Club Cinépolis",
    description: "Regístrate y obtén beneficios exclusivos en todas tus visitas.",
    buttonText: "Unirme ahora",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
    background: "linear-gradient(90deg, #003366 0%, #006699 100%)",
    badge: "Exclusivo"
  }
]

function mapear(data) {
  return {
    id:       data.id,
    title:    data.title,
    image:    data.poster_path
      ? `${TMDB_IMAGE_URL}${data.poster_path}`
      : "https://fakeimg.pl/500x750/0d1e35/F9B21A?text=Sin+Poster",
    year:     data.release_date?.substring(0, 4) || "—",
    genre:    data.genre_ids?.length ? GENEROS_MAP[data.genre_ids[0]] || "Película" : "Película",
    sinopsis: data.overview || "Sin descripción disponible.",
    rating:   data.vote_average?.toFixed(1) || "—",
  }
}

function Home({ onVerDetalle, onComprar, onToggleFavorito, esFavorito }) {
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [intentos, setIntentos]   = useState(0)

  useEffect(() => {
    if (TMDB_API_KEY === "AQUI_TU_API_KEY") {
      setError("sin_key"); setLoading(false); return
    }
    setLoading(true); setError(null)

    // Fetch paralelo usando los IDs del config
    Promise.all(
      PELICULAS.map(({ id }) =>
        fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=es-MX`)
          .then(r => r.json())
          .then(mapear)
          .catch(() => null)
      )
    ).then(resultados => {
      setPeliculas(resultados.filter(Boolean))
      setLoading(false)
    }).catch(() => { setError("error_red"); setLoading(false) })
  }, [intentos])

  const destacadas   = peliculas.slice(0, 6)
  const proximamente = peliculas.slice(6)

  if (error === "sin_key") return <PantallaApiKey />
  if (error === "error_red") return (
    <div style={{ textAlign:"center", padding:"80px 24px", color:"rgba(255,255,255,0.3)" }}>
      <div style={{ fontSize:"3rem", marginBottom:"16px" }}>⚠️</div>
      <p style={{ fontFamily:"'Open Sans',sans-serif", marginBottom:"20px" }}>No se pudieron cargar las películas</p>
      <button onClick={() => setIntentos(p => p+1)} className="btn-outline">Reintentar</button>
    </div>
  )

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <Carousel items={CAROUSEL_ITEMS} />
      
      <div className="page-hero">
        <span className="eyebrow">🎬 Cartelera destacada</span>
        <h1>Películas en Cartelera</h1>
        <p>Vive la mejor experiencia cinematográfica en Cinépolis</p>
      </div>

      <div className="main-content">
        {loading ? <Skeletons cantidad={6} titulo="⭐ Cargando películas..." /> : (
          <>
            <h2 className="section-subtitle">⭐ Destacadas esta semana</h2>
            <div className="grid-container">
              {destacadas.map((p, i) => (
                <div key={p.id} className={`movie-card delay-${(i%6)+1}`}>
                  <MovieCard
                    title={p.title} image={p.image} year={p.year}
                    genre={p.genre} sinopsis={p.sinopsis} rating={p.rating}
                    onVerDetalle={() => onVerDetalle(p)}
                    onComprar={() => onComprar(p)}
                    onToggleFavorito={onToggleFavorito}
                    esFavorito={esFavorito(p.title)}
                  />
                </div>
              ))}
            </div>

            {proximamente.length > 0 && (
              <>
                <h2 className="section-subtitle" style={{ marginTop:"48px" }}>🎬 Cartelera</h2>
                <div className="grid-container">
                  {proximamente.map((p, i) => (
                    <div key={p.id} className={`movie-card delay-${(i%6)+1}`}>
                      <MovieCard
                        title={p.title} image={p.image} year={p.year}
                        genre={p.genre} sinopsis={p.sinopsis} rating={p.rating}
                        onVerDetalle={() => onVerDetalle(p)}
                        onComprar={() => onComprar(p)}
                        onToggleFavorito={onToggleFavorito}
                        esFavorito={esFavorito(p.title)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        <PromocionesAPI />
      </div>
    </div>
  )
}

function Skeletons({ cantidad, titulo }) {
  return (
    <>
      {titulo && <h2 className="section-subtitle">{titulo}</h2>}
      <div className="grid-container">
        {Array.from({ length: cantidad }).map((_, i) => (
          <div key={i} style={{ borderRadius:"16px", overflow:"hidden", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ height:"320px", background:"linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
            <div style={{ padding:"14px" }}>
              <div style={{ height:"16px", borderRadius:"8px", background:"rgba(255,255,255,0.06)", marginBottom:"10px", width:"70%" }} />
              <div style={{ height:"11px", borderRadius:"6px", background:"rgba(255,255,255,0.04)", width:"45%" }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
    </>
  )
}

function PantallaApiKey() {
  return (
    <div style={{ maxWidth:"540px", margin:"60px auto", padding:"0 24px" }}>
      <div style={{ background:"rgba(249,178,26,0.07)", border:"1px solid rgba(249,178,26,0.25)", borderRadius:"20px", padding:"36px 32px", textAlign:"center" }}>
        <div style={{ fontSize:"3rem", marginBottom:"16px" }}>🔑</div>
        <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:"900", color:"#F9B21A", margin:"0 0 12px", fontSize:"1.2rem" }}>Falta la API key de TMDB</h3>
        <p style={{ color:"rgba(255,255,255,0.5)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.9rem", lineHeight:"1.7", marginBottom:"24px" }}>
          Abre <strong style={{color:"white"}}>peliculas.config.js</strong> y reemplaza <code style={{background:"rgba(255,255,255,0.08)",padding:"2px 8px",borderRadius:"5px",color:"#36F5AF"}}>AQUI_TU_API_KEY</code> con tu clave gratuita.
        </p>
        {[["1","Regístrate en themoviedb.org"],["2","Configuración → API → Solicitar key"],["3","Copia tu API key (v3)"],["4","Pégala en peliculas.config.js"]].map(([n,t]) => (
          <div key={n} style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px", textAlign:"left" }}>
            <span style={{ background:"#F9B21A", color:"#1a1200", borderRadius:"50%", width:"24px", height:"24px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Montserrat',sans-serif", fontWeight:"900", fontSize:"0.75rem", flexShrink:0 }}>{n}</span>
            <span style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Open Sans',sans-serif", fontSize:"0.86rem" }}>{t}</span>
          </div>
        ))}
        <a href="https://www.themoviedb.org/signup" target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:"20px", padding:"11px 28px", borderRadius:"25px", background:"linear-gradient(135deg,#F9B21A,#FF9B00)", color:"#1a1200", fontFamily:"'Montserrat',sans-serif", fontWeight:"800", fontSize:"0.88rem", textDecoration:"none", textTransform:"uppercase", letterSpacing:"1px" }}>
          Registrarme en TMDB →
        </a>
      </div>
    </div>
  )
}

export default Home
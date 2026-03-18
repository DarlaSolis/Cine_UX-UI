import MovieCard from "../components/MovieCard"
import PromocionesAPI from "../components/PromocionesAPI"

const peliculas = [
  { id:1, title:"El Cadáver de la Novia",  image:"https://mx.web.img3.acsta.net/c_310_420/img/43/12/4312c4902d60454604e1e9c73618ba3c.jpg", year:"2005", genre:"Fantasía/Romance", sinopsis:"En un pueblo victoriano, Víctor está a punto de casarse con Victoria, pero por error se encuentra casándose con una misteriosa novia cadáver que ha vuelto a la vida." },
  { id:2, title:"Oppenheimer",              image:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",              year:"2023", genre:"Drama/Historia",   sinopsis:"Durante la Segunda Guerra Mundial, el físico J. Robert Oppenheimer lidera el Proyecto Manhattan, que dará como resultado la bomba atómica." },
  { id:3, title:"Barbie",                   image:"https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",              year:"2023", genre:"Comedia",         sinopsis:"Después de ser expulsada de Barbieland, Barbie parte hacia el mundo humano para encontrar la verdadera felicidad." },
  { id:4, title:"Spider-Man: Spider-Verse", image:"https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",              year:"2023", genre:"Animación",       sinopsis:"Miles Morales regresa para una nueva aventura a través del multiverso, donde encuentra un equipo de Spider-People." },
  { id:5, title:"Deadpool & Wolverine",     image:"https://es.web.img2.acsta.net/c_310_420/img/3f/2e/3f2efc609e5e23d748f1d44231bf6b2f.jpg", year:"2024", genre:"Acción/Comedia",  sinopsis:"El mercenario Deadpool se une a Wolverine en una aventura que cambiará la historia del multiverso." },
  { id:6, title:"Kung Fu Panda 4",          image:"https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",              year:"2024", genre:"Animación",       sinopsis:"Po debe entrenar a un nuevo guerrero mientras enfrenta a una nueva villana, la Camaleona." },
]

function Home({ onVerDetalle, onComprar, onToggleFavorito, esFavorito }) {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="page-hero">
        <span className="eyebrow">🎬 Cartelera destacada</span>
        <h1>Películas en Cartelera</h1>
        <p>Vive la mejor experiencia cinematográfica en Cinépolis</p>
      </div>

      <div className="main-content">
        <h2 className="section-subtitle">⭐ Destacadas esta semana</h2>
        <div className="grid-container">
          {peliculas.map((pelicula, i) => (
            <div key={pelicula.id} className={`movie-card delay-${(i % 6) + 1}`}>
              <MovieCard
                title={pelicula.title}
                image={pelicula.image}
                year={pelicula.year}
                genre={pelicula.genre}
                sinopsis={pelicula.sinopsis}
                onVerDetalle={() => onVerDetalle(pelicula)}
                onComprar={() => onComprar(pelicula)}
                onToggleFavorito={onToggleFavorito}
                esFavorito={esFavorito(pelicula.title)}
              />
            </div>
          ))}
        </div>
        <PromocionesAPI />
      </div>
    </div>
  )
}

export default Home
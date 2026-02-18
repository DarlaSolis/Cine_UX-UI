import MovieCard from "../components/MovieCard"

const cartelera = [
  {
    id: 1,
    title: "Shingeki No Kyojin: The Final Season",
    image: "https://m.media-amazon.com/images/M/MV5BMzVhOGMzYzQtNzgyMi00NjZmLWEzYjUtMjQ2NDE3Njk4MmRkXkEyXkFqcGc@._V1_.jpg",
    year: "2024",
    genre: "Anime/Acción",
    sinopsis: "Eren Jaeger y sus amigos se enfrentan a la batalla final contra los titanes. Mientras los secretos del mundo se revelan, la humanidad lucha por su supervivencia en una guerra que determinará el destino de todos. La última temporada del aclamado anime."
  },
  {
    id: 2,
    title: "Bob Esponja: Al Rescate",
    image: "https://m.media-amazon.com/images/M/MV5BNjAyZDQwOTktZjc0Yi00MzNjLWI1NmUtODI2ZjJmYWRjOTA3XkEyXkFqcGc@._V1_.jpg",
    year: "2024",
    genre: "Animación/Comedia",
    sinopsis: "Bob Esponja y Patricio se embarcan en una aventura épica para rescatar a Gary, quien ha sido secuestrado por el Rey Poseidón. Viajarán a la Ciudad Perdida de Atlantic City, enfrentando peligros y conociendo nuevos amigos en el camino."
  },
  {
    id: 3,
    title: "Super Mario Bros.: La película",
    image: "https://m.media-amazon.com/images/I/91zqGNzwk5L._AC_SY879_.jpg",
    year: "2023",
    genre: "Animación/Aventura",
    sinopsis: "Mario y Luigi, dos hermanos fontaneros de Brooklyn, son transportados a un mundo mágico donde deberán luchar contra Bowser para salvar a la Princesa Peach y al Reino Champiñón. Una aventura llena de acción, humor y referencias a los videojuegos."
  },
  {
    id: 4,
    title: "Enredados",
    image: "https://es.web.img3.acsta.net/medias/nmedia/18/79/96/30/19541005.jpg",
    year: "2010",
    genre: "Animación",
    sinopsis: "Rapunzel, una princesa con cabello mágico, ha pasado toda su vida encerrada en una torre. Con la ayuda del carismático bandido Flynn Rider, escapa para descubrir el mundo exterior y conocer la verdad sobre su pasado."
  }
]

function Cartelera({ onVerDetalle }) {
  // Función para manejar errores de imagen
  const handleImageError = (e, pelicula) => {
    e.target.src = `https://fakeimg.pl/300x450/2c3e50/ff9800?text=${pelicula.title.replace(/ /g, '+')}&font=lobster`;
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{
        fontSize: "2rem",
        color: "#2c3e50",
        marginBottom: "24px",
        textAlign: "center",
        position: "relative",
        paddingBottom: "15px"
      }}>
        Cartelera Actual
        <span style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          backgroundColor: "#ff9800",
          borderRadius: "2px"
        }}></span>
      </h2>
      
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          padding: "16px"
        }}
      >
        {cartelera.map((pelicula, index) => (
          <div key={pelicula.id} style={{
            animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
            opacity: 0
          }}>
            <MovieCard
              title={pelicula.title}
              image={pelicula.image}
              year={pelicula.year}
              genre={pelicula.genre}
              sinopsis={pelicula.sinopsis}
              onVerDetalle={() => onVerDetalle(pelicula)}
              onImageError={(e) => handleImageError(e, pelicula)}
            />
          </div>
        ))}
      </main>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Cartelera
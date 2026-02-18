import MovieCard from "../components/MovieCard"

const peliculas = [
  {
    id: 1,
    title: "El Cadaver De La Novia",
    image: "https://mx.web.img3.acsta.net/c_310_420/img/43/12/4312c4902d60454604e1e9c73618ba3c.jpg",
    year: "2005",
    genre: "Fantasía/Romance",
    sinopsis: "En un pueblo victoriano, Victor está a punto de casarse con Victoria, pero por error se encuentra casándose con una misteriosa novia cadáver que ha vuelto a la vida. Atrapado en la Tierra de los Muertos, Victor descubre que Emily, la novia cadáver, tiene su propia historia de amor y tragedia. Una hermosa historia de amor, lealtad y segundas oportunidades del visionario Tim Burton."
  },
  {
    id: 2,
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: "2023",
    genre: "Drama/Historia",
    sinopsis: "Durante la Segunda Guerra Mundial, el físico J. Robert Oppenheimer lidera el Proyecto Manhattan, un proyecto de investigación y desarrollo ultrasecreto que dará como resultado la bomba atómica. La historia explora su vida, logros y las consecuencias morales de su creación, mostrando el dilema ético de un hombre que cambió el mundo para siempre."
  },
  {
    id: 3,
    title: "Barbie",
    image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    year: "2023",
    genre: "Comedia",
    sinopsis: "Después de ser expulsada de Barbieland por no ser una muñeca de aspecto perfecto, Barbie parte hacia el mundo humano para encontrar la verdadera felicidad. Una aventura llena de color, música y autodescubrimiento que cuestiona los estándares de perfección y celebra la individualidad."
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    year: "2023",
    genre: "Animación",
    sinopsis: "Miles Morales regresa para una nueva aventura a través del multiverso. Cuando se reúne con Gwen Stacy, es lanzado a través de dimensiones, donde encuentra a un equipo de Spider-People encargados de proteger la existencia misma del multiverso. Pero cuando los héroes no logran ponerse de acuerdo sobre cómo manejar una nueva amenaza, Miles se enfrenta a una difícil decisión."
  },
  {
    id: 5,
    title: "Deadpool 3",
    image: "https://es.web.img2.acsta.net/c_310_420/img/3f/2e/3f2efc609e5e23d748f1d44231bf6b2f.jpg",
    year: "2024",
    genre: "Acción/Comedia",
    sinopsis: "El mercenario bocazas Deadpool se une a Wolverine en una aventura que cambiará la historia del multiverso. Juntos enfrentarán amenazas mientras rompen la cuarta pared con su característico humor, violencia sin censura y diálogos llenos de referencias pop. Una explosiva combinación que los fanáticos han esperado por años."
  },
  {
    id: 6,
    title: "Kung Fu Panda 4",
    image: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    year: "2024",
    genre: "Animación",
    sinopsis: "Po debe entrenar a un nuevo guerrero para convertirse en el Guerrero Dragón, mientras enfrenta a una nueva villana, la Camaleona, que puede imitar a los maestros del kung fu. Una aventura llena de humor y artes marciales donde Po descubre que ser mentor puede ser tan difícil como ser héroe."
  }
]

function Home({ onVerDetalle }) {
  return (
    <div className="main-content">
      <h1 className="section-title">
        Películas Destacadas
      </h1>
      
      <div className="grid-container">
        {peliculas.map((pelicula, index) => (
          <div key={pelicula.id} className={`movie-card delay-${index + 1}`}>
            <MovieCard
              title={pelicula.title}
              image={pelicula.image}
              year={pelicula.year}
              genre={pelicula.genre}
              sinopsis={pelicula.sinopsis}
              onVerDetalle={() => onVerDetalle(pelicula)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
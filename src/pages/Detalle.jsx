import Button from "../components/Button"

function Detalle({ pelicula }) {
  const peliculaData = pelicula || {
    title: "Película no encontrada",
    image: "https://fakeimg.pl/800x400/212E5C/F9B21A?text=Cinepolis&font=montserrat",
    year: "2024",
    genre: "Género",
    sinopsis: "Sinopsis no disponible."
  }

  return (
    <main
      style={{
        padding: "40px 24px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "40px",
        alignItems: "start",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(9, 79, 138, 0.15)"
      }}>
        <div>
          <img 
            src={peliculaData.image}
            alt={peliculaData.title}
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(33, 46, 92, 0.2)",
              border: "4px solid #F9B21A"
            }}
          />
        </div>

        <div>
          <h2 style={{
            fontSize: "2.5rem",
            color: "#212E5C",
            marginBottom: "16px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "800",
            lineHeight: "1.2"
          }}>
            {peliculaData.title}
          </h2>
          
          <div style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: "wrap"
          }}>
            <span style={{
              backgroundColor: "#094F8A",
              padding: "8px 20px",
              borderRadius: "25px",
              color: "white",
              fontWeight: "600",
              fontFamily: "'Montserrat', sans-serif"
            }}>
              {peliculaData.year}
            </span>
            <span style={{
              backgroundColor: "#F9B21A",
              padding: "8px 20px",
              borderRadius: "25px",
              color: "#212E5C",
              fontWeight: "700",
              fontFamily: "'Montserrat', sans-serif"
            }}>
              {peliculaData.genre}
            </span>
          </div>

          <h3 style={{
            fontSize: "1.5rem",
            color: "#212E5C",
            marginBottom: "16px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700",
            borderBottom: "3px solid #F9B21A",
            paddingBottom: "8px",
            display: "inline-block"
          }}>
            Sinopsis
          </h3>

          <p style={{
            lineHeight: "1.8",
            color: "#333",
            marginBottom: "32px",
            fontSize: "1.1rem",
            fontFamily: "'Open Sans', sans-serif"
          }}>
            {peliculaData.sinopsis}
          </p>

          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "16px"
          }}>
            <Button text="Comprar Boletos" size="large" variant="primary" />
            <Button text="Ver Trailer" size="large" variant="outline" />
          </div>
          
          {/* Simulación de asientos disponibles */}
          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#F5F7FA",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#36F5AF",
              borderRadius: "4px"
            }}></div>
            <span style={{ color: "#212E5C" }}>
              Asientos disponibles - Función de hoy 20:30
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Detalle
import Button from "../components/Button"

const secciones = [
  {
    titulo: "Promociones",
    descripcion: "¡Aprovecha nuestras promociones especiales!",
    items: [
      { nombre: "Martes de Descuento", detalle: "2x1 en todos los boletos", precio: "$99" },
      { nombre: "Combo Familiar", detalle: "4 boletos + 2 palomotas grandes", precio: "$399" },
      { nombre: "Estudiantes", detalle: "30% de descuento presentando credencial", precio: "$70" },
      { nombre: "Miércoles de Dulcería", detalle: "50% en combos de dulcería", precio: "Desde $45" }
    ]
  },
  {
    titulo: "Membresías",
    descripcion: "Hazte miembro y disfruta de beneficios exclusivos",
    items: [
      { nombre: "CinePlus Premium", detalle: "Acceso ilimitado por 1 mes", precio: "$299/mes" },
      { nombre: "CinePlus Gold", detalle: "50% en dulcería + 2 boletos gratis", precio: "$499/mes" },
      { nombre: "Membresía Anual", detalle: "Beneficios exclusivos todo el año", precio: "$2,999/año" },
      { nombre: "Family Pack", detalle: "Hasta 4 miembros, descuentos especiales", precio: "$799/mes" }
    ]
  },
  {
    titulo: "Preventas",
    descripcion: "Asegura tu lugar para los próximos estrenos",
    items: [
      { nombre: "Avengers: Secret Wars", detalle: "Estreno 15 Mayo", precio: "Preventa $120" },
      { nombre: "Spider-Man 4", detalle: "Estreno 20 Junio", precio: "Preventa $120" },
      { nombre: "Star Wars: New Order", detalle: "Estreno 10 Julio", precio: "Preventa $120" },
      { nombre: "Jurassic World 4", detalle: "Estreno 5 Agosto", precio: "Preventa $120" }
    ]
  },
  {
    titulo: "Formatos Especiales",
    descripcion: "Vive el cine como nunca antes",
    items: [
      { nombre: "IMAX", detalle: "Pantalla gigante y sonido envolvente", precio: "$180" },
      { nombre: "4DX", detalle: "Movimiento y efectos especiales", precio: "$200" },
      { nombre: "ScreenX", detalle: "270° de proyección", precio: "$170" },
      { nombre: "VIP", detalle: "Butacas reclinables y servicio a tu asiento", precio: "$250" },
      { nombre: "3D", detalle: "Experiencia tridimensional", precio: "$150" }
    ]
  }
]

function Otros() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{
        fontSize: "2.5rem",
        color: "#2c3e50",
        textAlign: "center",
        marginBottom: "16px"
      }}>
        Experiencias Especiales
      </h2>

      <p style={{
        textAlign: "center",
        color: "#666",
        marginBottom: "40px",
        fontSize: "1.1rem",
        maxWidth: "800px",
        margin: "0 auto 40px"
      }}>
        Descubre todas las formas de disfrutar tu experiencia cinematográfica
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px"
      }}>
        {secciones.map((seccion, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{
              fontSize: "1.8rem",
              color: "#2c3e50",
              marginBottom: "8px"
            }}>
              {seccion.titulo}
            </h3>
            
            <p style={{
              color: "#666",
              marginBottom: "20px",
              borderBottom: "2px solid #ff9800",
              paddingBottom: "12px"
            }}>
              {seccion.descripcion}
            </p>

            <div style={{ marginBottom: "24px" }}>
              {seccion.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: idx < seccion.items.length - 1 ? "1px solid #eee" : "none"
                  }}
                >
                  <div>
                    <h4 style={{
                      fontSize: "1.1rem",
                      color: "#2c3e50",
                      marginBottom: "4px"
                    }}>
                      {item.nombre}
                    </h4>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#666"
                    }}>
                      {item.detalle}
                    </p>
                  </div>
                  <div style={{
                    textAlign: "right"
                  }}>
                    <span style={{
                      display: "block",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      color: "#ff9800"
                    }}>
                      {item.precio}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              text="Más información"
              variant="outline"
              size="medium"
              onClick={() => alert(`¡Próximamente más detalles de ${seccion.titulo}!`)}
            />
          </div>
        ))}
      </div>

      {/* Banner de membresía especial */}
      <div style={{
        marginTop: "48px",
        background: "linear-gradient(135deg, #c9f5ea, #a8e6cf)",
        borderRadius: "12px",
        padding: "40px",
        textAlign: "center"
      }}>
        <h3 style={{
          fontSize: "2rem",
          color: "#2c3e50",
          marginBottom: "16px"
        }}>
          🎉 ¡Membresía Anual con 20% de descuento!
        </h3>
        <p style={{
          fontSize: "1.2rem",
          color: "#2c3e50",
          marginBottom: "24px",
          maxWidth: "600px",
          margin: "0 auto 24px"
        }}>
          Aprovecha esta promoción especial y obtén todos los beneficios por un año
        </p>
        <Button
          text="Comprar ahora"
          size="large"
          onClick={() => alert("¡Gracias por tu compra! Te contactaremos pronto.")}
        />
      </div>
    </div>
  )
}

export default Otros
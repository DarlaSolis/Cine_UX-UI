import { useState } from "react"
import Button from "../components/Button"

const categorias = {
  bebidas: {
    nombre: "Bebidas",
    items: [
      { id: 1, nombre: "Coca-Cola", precio: 45, imagen: "https://preview.free3d.com/img/2016/06/2146698256179005024/wro4nem3.jpg" },
      { id: 2, nombre: "Agua Mineral", precio: 35, imagen: "https://www.basicos.mx/images/thumbs/0010546_agua-ciel-mineral-2-lts_450.png" },
      { id: 3, nombre: "Limonada", precio: 40, imagen: "https://i.bolder.run/r/czoyMzA1MyxnOjEwMDB4/f1d9f045/855482-7804643820154.png" },
      { id: 4, nombre: "Naranjada", precio: 42, imagen: "https://hebmx.vtexassets.com/arquivos/ids/621901/552014_image-1673924828.jpg" }
    ]
  },
  comestibles: {
    nombre: "Comestibles",
    items: [
      { id: 5, nombre: "Hot Dog", precio: 60, imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1280px-Hot_dog_with_mustard.png" },
      { id: 6, nombre: "Nachos", precio: 70, imagen: "https://detoxinista.com/wp-content/uploads/2023/11/vegan-nacho-cheese-on-chips.jpg" },
      { id: 7, nombre: "Pizza", precio: 85, imagen: "https://www.sortirambnens.com/wp-content/uploads/2019/02/pizza-de-peperoni.jpg" },
      { id: 8, nombre: "Hamburguesa", precio: 95, imagen: "https://www.cnature.es/wp-content/uploads/2021/12/hamburguesa-con-guacamole.jpg" }
    ]
  },
  snacks: {
    nombre: "Snacks y Dulces",
    items: [
      { id: 9, nombre: "Palomitas", precio: 55, imagen: "https://i.blogs.es/934bbc/1366_2000/450_1000.jpeg" },
      { id: 10, nombre: "Dulces", precio: 30, imagen: "https://ekosnegocios.com/image/posts/July2022/tnfkVKUAlQ9PLXgrCbhm.jpg" },
      { id: 11, nombre: "Chocolate", precio: 40, imagen: "https://phantom-expansion.unidadeditorial.es/ddfc15762273bc3d19fced5883f5dd7b/f/jpg/assets/multimedia/imagenes/2023/09/12/16945087962826.png" },
      { id: 12, nombre: "Gomitas", precio: 35, imagen: "https://m.media-amazon.com/images/I/711cdJ7hiYL._AC_UF894,1000_QL80_.jpg" }
    ]
  }
}

function Alimento() {
  const [mensaje, setMensaje] = useState("")

  const agregarAlCarrito = (item) => {
    setMensaje(`${item.nombre} agregado al carrito - $${item.precio}`)
    setTimeout(() => setMensaje(""), 2000)
  }

  return (
    <div className="main-content">
      {mensaje && (
        <div style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "linear-gradient(135deg, #4CAF50, #45a049)",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease"
        }}>
          {mensaje}
        </div>
      )}

      <h1 className="section-title">
        Alimentos y Bebidas
      </h1>

      <p style={{
        textAlign: "center",
        color: "#666",
        marginBottom: "40px",
        fontSize: "1.1rem"
      }}>
        ¡Disfruta de nuestros deliciosos combos!
      </p>

      {Object.entries(categorias).map(([key, categoria], index) => (
        <div key={key} style={{ marginBottom: "48px" }}>
          <h2 className="section-subtitle">
            {categoria.nombre}
          </h2>

          <div className="grid-container">
            {categoria.items.map((item, itemIndex) => (
              <div
                key={item.id}
                className={`alimento-card delay-${itemIndex + 1}`}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  animation: "fadeIn 0.5s ease-out forwards"
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
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </div>

                <div style={{ padding: "20px", textAlign: "center" }}>
                  <h3 style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    marginBottom: "8px"
                  }}>
                    {item.nombre}
                  </h3>
                  <p style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#ff9800",
                    marginBottom: "15px"
                  }}>
                    ${item.precio}
                  </p>
                  <Button
                    text="Agregar"
                    onClick={() => agregarAlCarrito(item)}
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Alimento
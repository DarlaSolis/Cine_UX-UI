import Button from "./Button"

function ListaFavoritos({ favoritos, onEliminarFavorito }) {
  if (favoritos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#F5F7FA", borderRadius: "8px", color: "#666" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>🌟 No tienes películas favoritas aún</p>
        <p style={{ fontSize: "0.9rem" }}>¡Haz clic en ❤️ Favorito en cualquier película para agregarla!</p>
      </div>
    )
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {favoritos.map((pelicula) => (
        <div
          key={pelicula.id}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "15px 20px", backgroundColor: "#F5F7FA",
            borderRadius: "8px", borderLeft: "4px solid #F9B21A", transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
        >
          <div>
            <h4 style={{ margin: 0, color: "#212E5C", fontSize: "1rem", fontWeight: "600" }}>{pelicula.title}</h4>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: "0.85rem" }}>{pelicula.year} • {pelicula.genre}</p>
          </div>
          <Button text="✕ Eliminar" onClick={() => onEliminarFavorito(pelicula.id)} variant="outline" size="small" />
        </div>
      ))}
    </div>
  )
}
export default ListaFavoritos
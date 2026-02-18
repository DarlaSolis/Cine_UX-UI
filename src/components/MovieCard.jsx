import Button from './Button'

function MovieCard({ title, image, onVerDetalle, year, genre, sinopsis }) {
  return (
    <div 
      style={{
        border: "none",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(9, 79, 138, 0.15)",
        transition: "all 0.3s ease",
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(33, 46, 92, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(9, 79, 138, 0.15)";
      }}
      onClick={onVerDetalle}
    >
      <div style={{ 
        position: "relative", 
        paddingTop: "150%", 
        backgroundColor: "#f0f0f0",
        overflow: "hidden"
      }}>
        <img
          src={image}
          alt={title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
        
        {/* Borde inferior con el amarillo del logo */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #F9B21A, #FF9B00)"
        }}></div>
      </div>

      <div style={{ padding: "20px", textAlign: "center", flex: 1 }}>
        <h3 style={{ 
          margin: "0 0 8px 0", 
          fontSize: "1.2rem",
          color: "#212E5C",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "700",
          lineHeight: "1.4"
        }}>
          {title}
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "16px",
          flexWrap: "wrap"
        }}>
          {year && (
            <span style={{ 
              backgroundColor: "#094F8A",
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "500"
            }}>
              {year}
            </span>
          )}
          {genre && (
            <span style={{ 
              backgroundColor: "#F9B21A",
              color: "#212E5C",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600"
            }}>
              {genre}
            </span>
          )}
        </div>

        <Button 
          text="Ver Detalle" 
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalle();
          }}
          size="small"
          variant="secondary"
        />
      </div>
    </div>
  )
}

export default MovieCard
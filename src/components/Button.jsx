function Button({ text, onClick, variant = "primary", size = "medium" }) {
  const variants = {
    primary: { background: "linear-gradient(135deg, #F9B21A, #FF9B00)", color: "#212E5C", border: "none" },
    secondary: { background: "linear-gradient(135deg, #094F8A, #0C5D8C)", color: "#FFFFFF", border: "none" },
    outline: { background: "transparent", color: "#F9B21A", border: "2px solid #F9B21A" },
    disponibilidad: { background: "#36F5AF", color: "#212E5C", border: "none" }
  }
  const sizes = {
    small: { padding: "6px 12px", fontSize: "0.9rem" },
    medium: { padding: "10px 20px", fontSize: "1rem" },
    large: { padding: "14px 28px", fontSize: "1.1rem" }
  }
  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant], ...sizes[size],
        borderRadius: "25px", cursor: "pointer", fontWeight: "700",
        fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase",
        letterSpacing: "1px", transition: "all 0.3s ease",
        width: size === "large" ? "100%" : "auto",
        boxShadow: "0 4px 6px rgba(33, 46, 92, 0.1)"
      }}
      onMouseEnter={(e) => {
        if (variant === "primary") { e.target.style.background = "linear-gradient(135deg, #FF9B00, #F9B21A)"; e.target.style.transform = "translateY(-2px)"; }
        else if (variant === "secondary") { e.target.style.background = "linear-gradient(135deg, #0C5D8C, #094F8A)"; e.target.style.transform = "translateY(-2px)"; }
        else if (variant === "outline") { e.target.style.background = "#F9B21A"; e.target.style.color = "#212E5C"; e.target.style.transform = "translateY(-2px)"; }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") { e.target.style.background = "linear-gradient(135deg, #F9B21A, #FF9B00)"; e.target.style.transform = "translateY(0)"; }
        else if (variant === "secondary") { e.target.style.background = "linear-gradient(135deg, #094F8A, #0C5D8C)"; e.target.style.transform = "translateY(0)"; }
        else if (variant === "outline") { e.target.style.background = "transparent"; e.target.style.color = "#F9B21A"; e.target.style.transform = "translateY(0)"; }
      }}
    >
      {text}
    </button>
  )
}
export default Button
import './Pages.css'

const SocioClub = () => {
  return (
    <div className="informative-view">
      <h1>Socio Club Cinépolis</h1>
      <div className="content-card">
        <p>Únete al programa de lealtad más importante de México y comienza a recibir beneficios increíbles desde tu primera visita.</p>
        <h3>Niveles de Socio:</h3>
        <div className="levels-grid">
          <div className="level">
            <h4>Fan</h4>
            <p>El inicio de tu camino. Acumula el 5% de tus compras.</p>
          </div>
          <div className="level">
            <h4>Fanático</h4>
            <p>Más visitas, más puntos. Acumula el 10% de tus compras.</p>
          </div>
          <div className="level">
            <h4>Súper Fanático</h4>
            <p>El nivel máximo. Acumula el 15% y recibe invitaciones a premieres.</p>
          </div>
        </div>
        <p>Tus puntos valen dinero en dulcería y taquilla.</p>
      </div>
    </div>
  )
}

export default SocioClub

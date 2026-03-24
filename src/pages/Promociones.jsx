import './Pages.css'

const Promociones = () => {
  return (
    <div className="informative-view">
      <h1>Promociones Especiales</h1>
      <div className="content-card">
        <p>Disfruta de las mejores promociones que Cinépolis tiene para ti. Desde combos exclusivos hasta descuentos en tus boletos.</p>
        <ul>
          <li><strong>Combos de Lunes a Miércoles:</strong> Ahorra hasta un 30% en dulcería.</li>
          <li><strong>Martes de Cinépolis:</strong> Boletos al 2x1 en salas tradicionales.</li>
          <li><strong>Cumpleañeros:</strong> Recibe un regalo especial en el mes de tu cumpleaños.</li>
        </ul>
        <p>Consulta términos y condiciones en cada promoción directamente en taquilla o nuestra App.</p>
      </div>
    </div>
  )
}

export default Promociones

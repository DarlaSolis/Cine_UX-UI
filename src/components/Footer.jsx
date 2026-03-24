import './Footer.css'

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Cartelera</h3>
          <ul>
            <li>Garantía Cinépolis</li>
            <li>+Que Cine</li>
            <li>Muestras y festivales</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Legales</h3>
          <ul>
            <li>Términos y condiciones</li>
            <li>Términos y condiciones Cineticket</li>
            <li>Aviso de privacidad</li>
            <li>Términos Cinecash</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Políticas</h3>
          <ul>
            <li>Políticas</li>
            <li>Línea de Denuncia</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>¿Quiénes somos?</h3>
          <ul>
            <li>Próximas Aperturas</li>
            <li>Ventas Corporativas</li>
            <li>Proveedores</li>
            <li>Cinépolis Jobs</li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contacto</h3>
          <div className="contact-info">
            <p><strong>Atención a clientes</strong></p>
            <p>T. 552 122 6060</p>
            <p>aac@atencioncinepolis.com</p>
            <p>@AyudaCinepolis</p>
            <p>Déjanos tus comentarios</p>
            <p>Facturación electrónica</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="brand-logos">
          <span className="logo-placeholder">comscore</span>
          <span className="logo-placeholder">marca</span>
          <span className="logo-placeholder">Coca-Cola</span>
          <span className="logo-placeholder">éntrele</span>
        </div>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>Sitio desarrollado por BowEight Technologies LLC</p>
        <p className="version">v0.1.0</p>
      </div>
    </footer>
  )
}

export default Footer

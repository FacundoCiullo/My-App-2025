import './style/layout.css';

const Footer = () => {
  return (
    <div className="footer-container bg-dark text-light py-4">
      <div className="row">

        <div className="col text-center">
          <p>Sobre Nosotros</p>
          <p>Novedades</p>
          <p>Ayuda</p>
        </div>

        <div className="col text-center">
          <a
            className="icon-footer"
            href="https://www.linkedin.com/in/facundo-ciullo/"
            aria-label="Ícono de LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/facundo-ciullo/"
            aria-label="Enlace a LinkedIn"
          >
            <h2 className="texto-footer">© 2023 Facundo Ciullo</h2>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;


const Footer = ()=> {
  return (
    <div className="container-fluid text-dark bg-dark py-4">
      <div className="row">
        <div className="col text-center text-light ">
          <p>Sobre Nosotros</p>
          <p>Novedades</p>
          <p>Ayuda</p>
        </div>
        <div className="col text-center">
          <a className="icon-footer" href="https://www.linkedin.com/in/facundo-ciullo/" alt="ícono de linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="https://www.linkedin.com/in/facundo-ciullo/">
          <h2 className="texto-footer" alt="enlace a linkedin 2023 Facundo Ciullo">© 2023 Facundo Ciullo</h2>
          </a>
        </div>
      </div>
    </div>
  )
}
  
export default Footer
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import SocialBar from "../components/layout/SocialBar";
import Testimonials from "../components/sections/Testimonials";
import Button from "react-bootstrap/Button";
import Destacados from "../components/sections/Destacados";
import { motion } from "framer-motion";
import Favorites from "../components/user/Favorites";
import { useAuth } from "../context/AuthContext";


const Inicio = () => {
  const { usuario, loading } = useAuth(); // 🔹 usamos usuario y loading del contexto

  const cardsData = [
    { backgroundImage: 'url("img/abrigos/05.jpg")', title: "Camperas", categoryId: "Abrigos" },
    { backgroundImage: 'url("img/remeras/02-rojo.jpg")', title: "Remeras", categoryId: "Remeras" },
    { backgroundImage: 'url("img/pantalones/02-2.jpg")', title: "Pantalones", categoryId: "Pantalon" },
    { backgroundImage: 'url("img/zapatillas/01.jpg")', title: "Zapatillas", categoryId: "Zapatillas" },
  ];

  return (
    <div className="inicio-landing">
      {/* 🔹 Hero principal con carrusel */}
      <section className="inicio-carousel mt-5">
        <Carousel fade interval={4000} pause="hover" indicators={false} controls>
          {cardsData.map((card, index) => (
            <Carousel.Item key={index}>
              <Link to={`/category/${card.categoryId}`} className="d-block w-100 text-decoration-none">
                <Card
                  className="text-light border-0 shadow-lg"
                  style={{
                    height: "40vh",
                    backgroundImage: card.backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center h-100"
                    style={{
                      borderRadius: "20px",
                      background: "rgba(0, 0, 0, 0.45)",
                    }}
                  >
                    <motion.h2
                      className="fw-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        fontSize: "2.8rem",
                        textShadow: "3px 3px 10px rgba(0,0,0,0.9)",
                      }}
                    >
                      {card.title}
                    </motion.h2>
                  </div>
                </Card>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* 🔹 Sección de bienvenida */}
      <motion.section
        className="text-center my-5 container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="fw-bold mb-3">Bienvenido a <span className="highlight">App Store Demo</span></h1>
        <p className="text-muted fs-5">
          Descubrí la mejor moda urbana con envío rápido, calidad premium y atención personalizada.
        </p>
        <Link to="/Productos">
          <Button variant="dark" size="lg" className="mt-3 shadow-sm">
            Explorar productos
          </Button>
        </Link>
      </motion.section>

      {/* 🔹 Sección de productos destacados */}
      <motion.section
        className="my-5 container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center mb-4 fw-bold">Productos destacados</h2>
        <Destacados limit={8} />
      </motion.section>

      {/* 🔹 Sección de productos Favoritos solo si hay usuario logueado */}
      {!loading && usuario && (
        <motion.section
          className="my-5 container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-4 fw-bold">Productos Favoritos</h2>
          <Favorites limit={4} />
        </motion.section>
      )}

      {/* 🔹 Sección de conexión con redes */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Conectate con nosotros</h2>
        <SocialBar inline={false} />
      </section>

      {/* 🔹 Testimonios */}
      <Testimonials />

      {/* 🔹 Sección de beneficios */}
      <motion.section
        className="benefits-section text-center py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="fw-bold mb-4">¿Por qué elegirnos?</h2>
          <div className="row justify-content-center">
            <div className="col-md-3 col-10 mb-4">
              <div className="p-3 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-truck fs-1 text-primary"></i>
                <h5 className="mt-3 fw-bold">Envíos a todo el país</h5>
                <p className="text-muted">Recibí tu pedido rápido y seguro en tu domicilio.</p>
              </div>
            </div>
            <div className="col-md-3 col-10 mb-4">
              <div className="p-3 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-shield-check fs-1 text-success"></i>
                <h5 className="mt-3 fw-bold">Compra segura</h5>
                <p className="text-muted">Pagos protegidos y garantía de satisfacción.</p>
              </div>
            </div>
            <div className="col-md-3 col-10 mb-4">
              <div className="p-3 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-star fs-1 text-warning"></i>
                <h5 className="mt-3 fw-bold">Calidad garantizada</h5>
                <p className="text-muted">Productos seleccionados con los mejores materiales.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🔹 Sección final / contacto */}
      <motion.section
        className="contact-section text-center text-light py-5 mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="fw-bold mb-3">¿Listo para tu próximo look?</h2>
        <p className="lead mb-4">Encontrá lo que buscás</p>
        <Link to="/contacto">
          <Button variant="light" size="lg">Contactanos</Button>
        </Link>
      </motion.section>
    </div>
  );
};

export default Inicio;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ItemQuickView from "../items/ItemQuickView"; // ✅ ajustado
import { useFavorites } from "../../context/FavoritesContext"; // ✅ usamos el hook del contexto

const FavoritesList = () => {
  const { favorites } = useFavorites(); // ✅ accedemos con el hook
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  // 🔹 Si no hay favoritos
  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center text-muted my-5">
        <h5>No tienes productos en favoritos</h5>
        <p>Explorá los productos y marcá algunos con el corazón.</p>
        <Link to="/Productos" className="btn btn-dark mt-3">
          Ver productos
        </Link>
      </div>
    );
  }

  // 🔹 Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Favoritos</h2>

      <motion.div
        className="row g-4 justify-content-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {favorites.map((producto) => (
          <motion.div
            key={producto.id}
            variants={itemVariants}
            className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <Card
              className="card-producto border-0 rounded-4 shadow-sm overflow-hidden position-relative"
              style={{ cursor: "pointer" }}
            >
              <Link to={`/item/${producto.id}`}>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.titulo}
                  className="card-img"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
              </Link>

              {/* 🔹 Overlay con vista rápida */}
              <div
                className="quickview-overlay d-flex align-items-end justify-content-center"
                onClick={() => handleQuickView(producto)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.3)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                <button
                  className="btn btn-light mb-3 shadow-sm"
                  style={{ fontWeight: "500" }}
                >
                  🔍 Vista rápida
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 Modal de vista rápida */}
      <ItemQuickView
        show={showModal}
        handleClose={() => setShowModal(false)}
        producto={selectedProduct}
      />
    </div>
  );
};

export default FavoritesList;

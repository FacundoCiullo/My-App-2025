import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Heart, HeartFill } from "react-bootstrap-icons";

import "react-toastify/dist/ReactToastify.css";
import ".//style/itemQuickView.css";

const ItemQuickView = ({ show, handleClose, producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [color, setColor] = useState("");
  const [talle, setTalle] = useState("");
  const [localFavorite, setLocalFavorite] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { addItem } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      setColor(producto.colores?.[0] || "");
      setTalle(producto.talles?.[0] || "");
      setCantidad(1);
      setLocalFavorite(user ? isFavorite(producto.id) : false);
    }
  }, [producto, user, isFavorite]);

  if (!producto) return null;

  const imagenes =
    color && producto.imagenesPorColor?.[color]
      ? producto.imagenesPorColor[color]
      : [producto.imagen];

  const handleAgregarCarrito = () => {
    if (producto.colores?.length && !color) {
      toast.error("Seleccioná un color ⚠️", { position: "top-center" });
      return;
    }
    if (producto.talles?.length && !talle) {
      toast.error("Seleccioná un talle ⚠️", { position: "top-center" });
      return;
    }

    addItem({ ...producto, color, talle }, cantidad);
    handleClose();

    toast.success(`${producto.titulo} agregado al carrito`, {
      position: "top-center",
      autoClose: 2500,
      onClick: () => navigate("/cart"),
    });
  };

  const handleFavorito = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const yaEsFavorito = localFavorite;
    toggleFavorite(producto);
    setLocalFavorite(!yaEsFavorito);

    const msg = yaEsFavorito ? "Eliminado de favoritos" : "Agregado a favoritos";
    toast.success(msg, { position: "top-center", autoClose: 700 });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {producto.marca} {producto.titulo}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="iqv-container">
            {/* IMÁGENES */}
            <div className="iqv-imagenes">
              {imagenes.length > 1 ? (
                <Carousel indicators={false}>
                  {imagenes.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={img}
                        alt={`${producto.titulo} ${i + 1}`}
                        className="iqv-img"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img src={imagenes[0]} alt={producto.titulo} className="iqv-img" />
              )}
            </div>

            {/* DETALLES */}
            <div className="iqv-detalles">
              {/* PRECIO + FAVORITO */}
              <div className="iqv-precio-fav">
                <h3>${producto.precio?.toLocaleString("es-AR")}</h3>

                <motion.div
                  whileTap={{ scale: 1.3 }}
                  animate={{
                    scale: localFavorite ? [1, 1.3, 1] : 1,
                    transition: { duration: 0.3 },
                  }}
                  onClick={handleFavorito}
                  className="iqv-fav-icon"
                >
                  {localFavorite ? (
                    <HeartFill size={24} color="#ffcc00" />
                  ) : (
                    <Heart size={24} color="gray" />
                  )}
                </motion.div>
              </div>

              <p className="iqv-descripcion">
                {producto.descripcion || "Sin descripción disponible."}
              </p>

              {/* TALLE */}
              {producto.talles?.length > 0 && (
                <Form.Group className="iqv-group">
                  <Form.Label>Talle:</Form.Label>
                  <div className="iqv-options">
                    {producto.talles.map((t) => (
                      <Button
                        key={t}
                        variant={talle === t ? "dark" : "outline-dark"}
                        size="sm"
                        onClick={() => setTalle(t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              )}

              {/* COLOR */}
              {producto.colores?.length > 0 && (
                <Form.Group className="iqv-group">
                  <Form.Label>Color:</Form.Label>
                  <div className="iqv-options">
                    {producto.colores.map((c) => (
                      <Button
                        key={c}
                        variant={color === c ? "dark" : "outline-dark"}
                        size="sm"
                        onClick={() => setColor(c)}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              )}

              {/* CANTIDAD */}
              <Form.Group className="iqv-cantidad">
                <Form.Label className="me-2 mb-0">Cantidad:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={producto.stock ?? 10}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="iqv-input-cantidad"
                />
              </Form.Group>

              {/* BOTONES */}
              <div className="iqv-botones">
                <Button variant="dark" onClick={handleAgregarCarrito}>
                  🛒 Agregar al carrito
                </Button>
                <Link
                  to={`/item/${producto.id}`}
                  className="btn btn-outline-primary"
                  onClick={handleClose}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* MODAL LOGIN */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Debés iniciar sesión para agregar a favoritos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ItemQuickView;

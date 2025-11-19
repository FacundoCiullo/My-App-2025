import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsBookmarkStarFill } from "react-icons/bs";

const ItemQuickView = ({ show, handleClose, producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [color, setColor] = useState("");
  const [talle, setTalle] = useState("");
  const { addItem } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      setColor(producto.colores?.[0] || "");
      setTalle(producto.talles?.[0] || "");
      setCantidad(1);
    }
  }, [producto]);

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
      theme: "",
      onClick: () => navigate("/cart"),
    });
  };

  const handleFavorito = () => {
    toggleFavorite(producto);
    const msg = isFavorite(producto.id)
      ? "Eliminado de favoritos"
      : "Agregado a favoritos";
    toast.success(msg, { position: "top-center", autoClose: 1500, });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{producto.titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row align-items-center">
            {/* Imagen principal */}
            <div className="col-md-6 text-center">
              {imagenes.length > 1 ? (
                <Carousel indicators={false}>
                  {imagenes.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={img}
                        alt={`${producto.titulo} ${i + 1}`}
                        className="img-fluid rounded-4 shadow-sm mb-3"
                        style={{
                          maxHeight: "300px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={imagenes[0]}
                  alt={producto.titulo}
                  className="img-fluid rounded-4 shadow-sm mb-3"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              )}
            </div>

            {/* Precio y Detalles */}
            <div className="col-md-6 text-start">
              {/* 💰 Precio y marcador animado */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="m-0">
                  ${producto.precio?.toLocaleString("es-AR")}
                </h3>
                <motion.div
                  whileTap={{ scale: 1.3 }}
                  animate={{
                    scale: isFavorite(producto.id) ? [1, 1.3, 1] : 1,
                    transition: { duration: 0.3 },
                  }}
                  onClick={handleFavorito}
                  style={{ cursor: "pointer" }}
                >
                <BsBookmarkStarFill
                  size={24}
                  color={isFavorite(producto.id) ? "#ffcc00" : "gray"}
                />
                </motion.div>
              </div>

              <p>{producto.descripcion || "Sin descripción disponible."}</p>

              {/* Talle */}
              {producto.talles?.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Talle:</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
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

              {/* Color */}
              {producto.colores?.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Color:</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
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

              {/* Cantidad */}
              <Form.Group className="d-flex align-items-center mb-3">
                <Form.Label className="me-2 mb-0">Cantidad:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={producto.stock ?? 10}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  style={{ width: "80px" }}
                />
              </Form.Group>

              {/* Botones */}
              <div className="d-flex gap-2">
                <Button
                  variant="dark"
                  className="flex-fill"
                  onClick={handleAgregarCarrito}
                >
                  🛒 Agregar al carrito
                </Button>
                <Link
                  to={`/item/${producto.id}`}
                  className="btn btn-outline-primary flex-fill"
                  onClick={handleClose}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ItemQuickView;

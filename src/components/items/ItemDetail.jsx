import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import ItemCount from "./ItemCount";
import { Carousel, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { BsBookmarkStarFill } from "react-icons/bs";

const ItemDetail = ({ producto }) => {
  const { addItem } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useFavorites();

  const [color, setColor] = useState("");
  const [talle, setTalle] = useState("");
  const [cantidad, setCantidad] = useState(1);

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

  const handleAdd = () => {
    if (!color || !talle) return;

    addItem(
      {
        ...producto,
        color,
        talle,
      },
      cantidad
    );
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">

        {/* IMÁGENES */}
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
                      maxHeight: "350px",
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
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          )}
        </div>

        {/* INFORMACIÓN */}
        <div className="col-md-6">

          {/* Título + Favorito */}
          <div className="d-flex justify-content-between">
            <h2>{producto.titulo}</h2>

            <motion.div
              whileTap={{ scale: 1.3 }}
              animate={{
                scale: isFavorite(producto.id) ? [1, 1.3, 1] : 1,
                transition: { duration: 0.3 },
              }}
              onClick={() => toggleFavorite(producto)}
              style={{ cursor: "pointer" }}
            >
              <BsBookmarkStarFill
                size={26}
                color={isFavorite(producto.id) ? "#ffcc00" : "gray"}
              />
            </motion.div>
          </div>

          <h4 className="fw-bold">${producto.precio?.toLocaleString("es-AR")}</h4>

          <p>{producto.descripcion || "Sin descripción disponible."}</p>

          {/* TALLE */}
          {producto.talles?.length > 0 && (
            <div className="mb-3">
              <strong>Talle:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
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
            </div>
          )}

          {/* COLOR */}
          {producto.colores?.length > 0 && (
            <div className="mb-3">
              <strong>Color:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
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
            </div>
          )}

          {/* CANTIDAD */}
          <div className="mt-3">
            <strong>Cantidad:</strong>
            <ItemCount
              stock={producto.stock ?? 10}
              initial={1}
              onAdd={(q) => setCantidad(q)}
            />
          </div>

          {/* BOTÓN */}
          <div className="mt-3">
            <Button
              variant="dark"
              className="w-100"
              onClick={handleAdd}
            >
              🛒 Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

// src/components/items/Item.jsx
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Item = ({ producto, colorSeleccionado, handleQuickView }) => {

  // Elegir imagen según el color filtrado
  const imagenFinal =
    colorSeleccionado &&
    producto.imagenesPorColor &&
    producto.imagenesPorColor[colorSeleccionado]
      ? producto.imagenesPorColor[colorSeleccionado]
      : producto.imagen; // imagen principal o default

  return (
    <Card
      className="card-producto border-0 rounded-4 shadow-sm overflow-hidden position-relative"
      style={{ cursor: "pointer" }}
    >
      <Link to={`/item/${producto.id}`}>
        <Card.Img
          variant="top"
          src={imagenFinal}
          alt={producto.titulo}
          className="card-img"
          style={{
            height: "300px",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />
      </Link>

      {/* Overlay QuickView */}
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
        <button className="btn btn-light mb-3 shadow-sm" style={{ fontWeight: "500" }}>
          🔍 Vista rápida
        </button>
      </div>
    </Card>
  );
};

export default Item;

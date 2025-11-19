// src/components/items/Item.jsx
import "./style/Item.css";
import Card from "react-bootstrap/Card";
import { useState } from "react";

const Item = ({ producto, colorSeleccionado, handleQuickView }) => {
  const [hover, setHover] = useState(false);

  const imagenFinal =
    colorSeleccionado &&
    producto.imagenesPorColor &&
    producto.imagenesPorColor[colorSeleccionado]
      ? producto.imagenesPorColor[colorSeleccionado]
      : producto.imagen;

  return (
    <Card
      className={`card-producto ${hover ? "hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleQuickView(producto)}
    >
      {/* Imagen con efecto */}
      <Card.Img
        variant="top"
        src={imagenFinal}
        alt={producto.titulo}
        className="card-img"
      />

      {/* Overlay inferior */}
      <div className={`card-overlay ${hover ? "show" : ""}`}>
        <h5 className="card-title">{producto.titulo}</h5>
        <p className="card-desc">{producto.descripcion}</p>
      </div>
    </Card>
  );
};

export default Item;

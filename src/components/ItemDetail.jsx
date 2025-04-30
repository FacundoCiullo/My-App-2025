import { useContext } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "./context/CartContext";

const ItemDetail = ({ producto }) => {
  const { addItem } = useContext(CartContext);

  const onAdd = (quantity) => {
    addItem(producto, quantity);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-5 offset-md-1">
          <img src={producto.imagen} alt={producto.titulo} className="img-fluid" />
        </div>
        <div className="col-md-5">
          <h1>{producto.titulo}</h1>
          <h3>{producto.descripcion}</h3>
          <p><b>${producto.precio}</b></p>
          <ItemCount stock={producto.stock} onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
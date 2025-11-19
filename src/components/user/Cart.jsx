// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cart = () => {
  const { cart, cartTotal, clear, removeItem, sumTotal } = useContext(CartContext);

  if (cartTotal() === 0) {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-12 text-center">
            <div className="alert alert-danger" role="alert">
              No se encontraron productos en el carrito!
            </div>
            <Link to="/Home" className="btn btn-secondary">
              Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col text-center">
          <h1>Productos Seleccionados</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table align-middle">
            <tbody>
              <tr>
                <td colSpan={6}></td>
                <td className="text-end">
                  <button
                    className="btn btn-light"
                    onClick={clear}
                    title="Vaciar carrito"
                  >
                    Vaciar Carrito
                  </button>
                </td>
              </tr>

              {cart.map((item) => (
                <tr key={`${item.id}-${item.color}-${item.talle}`}>
                  <td>
                    <img src={item.imagen} alt={item.titulo} width={80} />
                  </td>

                  <td className="align-middle">
                    <strong>{item.marca}</strong> — {item.titulo}
                  </td>

                  <td className="align-middle">
                    <div className="d-flex gap-3">
                      <span><strong>Color:</strong> {item.color || "—"}</span>
                      <span><strong>Talle:</strong> {item.talle || "—"}</span>
                    </div>
                  </td>

                  <td className="align-middle">
                    {item.quantity} x ${item.precio}
                  </td>

                  <td className="align-middle text-center">
                    ${item.quantity * item.precio}
                  </td>

                  <td className="align-middle text-end">
                    <button
                      className="btn btn-light"
                      onClick={() => removeItem(item.id, item.color, item.talle)}
                      title="Eliminar producto"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={4} className="text-end fw-bold">
                  Total a pagar
                </td>
                <td className="text-center fw-bold">${sumTotal()}</td>
                <td className="text-end">
                  <Link to="/checkout" className="btn btn-light">
                    Finalizar compra
                  </Link>
                </td>
                <td className="text-end">
                  <Link to="/Productos" className="btn btn-light">
                    Seguir comprando
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;

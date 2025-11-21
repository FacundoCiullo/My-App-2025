import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, Button } from "react-bootstrap";

const Cart = () => {
  const { cart, cartTotal, clear, removeItem, sumTotal } = useContext(CartContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    navigate("/checkout");
  };

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
    <>
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

                {/* Botón para vaciar carrito */}
                <tr>
                  <td colSpan={6}></td>
                  <td className="text-end">
                    <button className="btn btn-light" onClick={clear}>
                      Vaciar Carrito
                    </button>
                  </td>
                </tr>

                {/* Productos */}
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
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Total y botones */}
                <tr>
                  <td colSpan={4} className="text-end fw-bold">
                    Total a pagar
                  </td>

                  <td className="text-center fw-bold">${sumTotal()}</td>

                  <td className="text-end">
                    <button className="btn btn-light" onClick={handleCheckout}>
                      Finalizar compra
                    </button>
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

      {/* MODAL DE LOGIN */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciá sesión</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Para finalizar tu compra es necesario iniciar sesión.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;

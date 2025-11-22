import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, Button } from "react-bootstrap";
import "./cart.css";

const Cart = () => {
  const { cart, cartTotal, clear, removeItem, sumTotal } = useContext(CartContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    navigate("/checkout");
  };

  // Si el carrito está vacío
  if (cartTotal() === 0) {
    return (
      <div className="cart-empty container">
        <div className="row my-5">
          <div className="col text-center">
            <div className="alert alert-danger">
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
      {/* ------------------ MOBILE VERSION ------------------ */}
      <div className="mobile-cart-list">

        <div className="row">
          <div className="col text-center">
            <h1>Productos Seleccionados</h1>
          </div>
        </div>

        <Link className="keep-buying-mobile" to="/Productos">
          Seguir comprando
        </Link>

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.color}-${item.talle}-${item.marca}`}
            className="mobile-cart-card"
          >
            <div className="card-left">
              <img src={item.imagen} alt={item.titulo} />
            </div>

            <div className="card-right ">
              <div className="card-top">
                <h2>{item.marca} {item.titulo}</h2>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id, item.color, item.talle)}
                >
                  ✕
                </button>
              </div>

              <p className="item-color">
                Color: <span>{item.color}</span> Talle: <span>{item.talle}</span>
              </p>
              
              <div className="item-cart-footer"> 

                <p className="">Cantidad</p>
                
                <div className="qty-box">x{item.quantity}</div>
                
                <p className="item-price">${item.precio}</p>
              </div>

            </div>
          </div>
        ))}

        {/* Price details */}
        <div className="price-details">
          <h3>Price Details</h3>

          <div className="price-row">
            <span>Total Product Price</span>
            <span>${sumTotal()}</span>
          </div>

          <div className="price-row">
            <span>Total Discounts</span>
            <span>$0</span>
          </div>

          <div className="price-row total">
            <span>Order Total</span>
            <span>${sumTotal()}</span>
          </div>
        </div>



        <button className="continue-btn" onClick={handleCheckout}>
          Continue
        </button>

        <button className="clear-mobile" onClick={clear}>
          Vaciar carrito
        </button>

      </div>

      {/* ------------------ DESKTOP VERSION ORIGINAL ------------------ */}
      <div className="cart-container container my-5 desktop-table">
        <div className="row">
          <div className="col text-center">
            <h1>Productos Seleccionados</h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <table className="table cart-table align-middle">
              <tbody>
                <tr className="cart-actions-row">
                  <td colSpan={6}></td>
                  <td className="text-end">
                    <button className="btn btn-light cart-clear-btn" onClick={clear}>
                      Vaciar Carrito
                    </button>
                  </td>
                </tr>

                {cart.map((item) => (
                  <tr
                    key={`${item.id}-${item.color}-${item.talle}`}
                    className="cart-item-row"
                  >
                    <td>
                      <img src={item.imagen} alt={item.titulo} className="cart-item-img" />
                    </td>

                    <td className="align-middle">
                      <strong>{item.marca}</strong> — {item.titulo}
                    </td>

                    <td className="align-middle">
                      <div className="d-flex gap-2 flex-wrap">
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
                        className="btn btn-light cart-remove-btn"
                        onClick={() => removeItem(item.id, item.color, item.talle)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}

                <tr className="cart-total-row">
                  <td colSpan={4} className="text-end fw-bold">
                    Total a pagar
                  </td>
                  <td className="text-center fw-bold">${sumTotal()}</td>
                  <td className="text-end">
                    <button className="btn btn-light cart-checkout-btn" onClick={handleCheckout}>
                      Finalizar compra
                    </button>
                  </td>
                  <td className="text-end">
                    <Link to="/Productos" className="btn btn-light cart-continue-btn">
                      Seguir comprando
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal login */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciá sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Para finalizar tu compra es necesario iniciar sesión.</Modal.Body>
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

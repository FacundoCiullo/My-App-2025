import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cart = () => {
  const {cart, cartTotal, clear, removeItem, sumTotal} = useContext(CartContext);

  if (cartTotal() === 0) {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-12 text-center">
            <div className="alert alert-danger" role="alert">No se encontraron Productos en el Carrito!</div>
            <Link to={"/"} className="btn btn-secondary">Volver a la Página Principal</Link>
          </div>
        </div>
      </div>
    )
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
          <table className="table">
            <tbody>
              <tr>
                <td colSpan={4}>&nbsp;</td>
                <td className="text-end"><button className="btn btn-light" onClick={() => {clear()}} title="Vaciar Carrito">Vaciar Carrito</button></td>
              </tr>
              {
                cart.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.imagen} alt={item.titulo} width={80} /></td>
                    <td className="align-middle">{item.titulo}</td>
                    <td className="align-middle">{item.quantity} x ${item.precio}</td>
                    <td className="align-middle text-center">${item.quantity * item.precio}</td>
                    <td className="align-middle text-end"><button className="btn btn-light" onClick={() => {removeItem(item.id)}} title="Eliminar Producto"><i className="bi bi-trash3-fill"></i></button></td>
                  </tr>
                ))
              }
              <tr>
                <td colSpan={3} className="align-middle text-end">Total a Pagar</td>
                <td className="align-middle text-center">${sumTotal()}</td>
                <td className="align-middle text-end"><Link to={"/checkout"} className="btn btn-light">Finalizar Compra</Link></td>
                <td className="align-middle text-end"><Link to={"/"} className="btn btn-light">Seguir comprando</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cart;
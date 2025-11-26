// src/components/Checkout.jsx
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clear, sumTotal } = useContext(CartContext);
  const { user } = useAuth();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [orderId, setOrderId] = useState("");

  // Precarga datos del usuario logueado
  useEffect(() => {
    if (user) {
      setNombre(user.displayName || "");
      setEmail(user.email || "");
      setTelefono(user.phoneNumber || "");
    }
  }, [user]);

  // --- VALIDACIÓN DE TELÉFONO ARGENTINO ---
  const validarTelefono = (value) => {
    // Solo números
    const soloNumeros = value.replace(/\D/g, "");

    setTelefono(soloNumeros);

    // No validar si está vacío (que se valide al enviar)
    if (soloNumeros.length === 0) {
      setTelefonoError("");
      return;
    }

    // Debe tener 10 u 11 dígitos aprox. según formato sin 0 ni 15 (11 es lo más común)
    if (soloNumeros.length !== 10 && soloNumeros.length !== 11) {
      setTelefonoError("El teléfono debe tener 10 u 11 dígitos (sin 0 ni 15).");
      return;
    }

    setTelefonoError("");
  };

  const generarOrden = () => {
    if (!nombre || !email || !telefono) {
      alert("Por favor completá todos los datos del comprador.");
      return;
    }

    if (telefonoError) {
      alert("El teléfono no es válido.");
      return;
    }

    const buyer = { name: nombre, phone: telefono, email };

    const items = cart.map((item) => ({
      id: item.id,
      title: item.titulo,
      marca: item.marca || "",
      price: item.precio,
      quantity: item.quantity,
      color: item.color || "",
      talle: item.talle || "",
      imagen: item.imagen || "/img/no-image.png",
    }));

    const fecha = new Date();
    const date = fecha.toISOString().slice(0, 16).replace("T", " ");
    const total = sumTotal();

    const order = { buyer, items, date, total };

    addDoc(collection(db, "orders"), order)
      .then((resultado) => {
        setOrderId(resultado.id);
        clear();
      })
      .catch((error) => {
        console.log("Error! No se pudo completar la compra:", error);
      });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col text-center">
          <h2>Confirmación de Orden</h2>
        </div>
      </div>

      <div className="row">
        {/* FORMULARIO */}
        <div className="col-md-5 offset-md-1">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={nombre} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" value={email} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className={`form-control ${telefonoError ? "is-invalid" : ""}`}
                value={telefono}
                onChange={(e) => validarTelefono(e.target.value)}
                placeholder="Ej: 1155334455"
              />
              {telefonoError && (
                <div className="invalid-feedback">{telefonoError}</div>
              )}
            </div>

            <button
              type="button"
              className="btn btn-dark"
              onClick={generarOrden}
              disabled={Boolean(telefonoError)}
            >
              Generar Orden
            </button>
          </form>
        </div>

        {/* RESUMEN DEL CARRITO */}
        <div className="col-md-5">
          <table className="table">
            <tbody>
              {cart.map((item) => (
                <tr key={item.id + item.color + item.talle}>
                  <td>
                    <img src={item.imagen} alt={item.titulo} width={85} />
                  </td>

                  <td className="align-middle">
                    <strong>{item.marca}</strong> — {item.titulo}
                    <br />
                    <small className="text-muted">
                      Color: {item.color} | Talle: {item.talle}
                    </small>
                  </td>

                  <td className="align-middle">
                    {item.quantity} x ${item.precio}
                  </td>

                  <td className="align-middle text-center">
                    ${item.quantity * item.precio}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={3} className="text-end fw-bold">
                  Total a pagar
                </td>
                <td className="fw-bold text-center">${sumTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {orderId && <Navigate to={"/thankyou/" + orderId} />}
    </div>
  );
};

export default Checkout;

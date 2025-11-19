// src/components/HistorialCompras.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const HistorialCompras = () => {
  const { usuario } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) {
      setLoading(false);
      return;
    }

    const cargarOrdenes = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("buyer.email", "==", usuario.email)
        );

        const querySnapshot = await getDocs(q);
        const resultados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrdenes(resultados);
      } catch (error) {
        console.error("Error cargando historial:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarOrdenes();
  }, [usuario]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!usuario) {
    return (
      <h3 className="text-center mt-5">
        Debes iniciar sesión para ver tu historial.
      </h3>
    );
  }

  if (ordenes.length === 0) {
    return (
      <h4 className="text-center mt-5 text-muted">
        No tienes compras registradas todavía.
      </h4>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Historial de compras</h2>

      {ordenes.map((ord) => (
        <div key={ord.id} className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title m-0">Orden #{ord.id}</h5>
              <span className="badge bg-secondary">{ord.date}</span>
            </div>

            <hr />

            {ord.items.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-3 p-2 border rounded shadow-sm bg-light"
              >
                <img
                  src={item.imagen || item.image || "/img/no-image.png"}
                  alt={item.title}
                  className="me-3 rounded"
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-bold">{item.title}</h6>
                  <p className="mb-1 text-muted small">Cantidad: {item.quantity}</p>
                  <p className="mb-0 text-muted small">
                    Precio unitario: ${item.price}
                  </p>
                </div>

                <div className="text-end">
                  <span className="fw-bold">${item.price * item.quantity}</span>
                </div>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mt-3">
              <strong>Total pagado:</strong>
              <strong className="text-success fs-5">${ord.total}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorialCompras;

// src/components/HistorialCompras.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const HistorialCompras = () => {
  // 🔹 Obtenemos el usuario logueado y el estado de carga desde AuthContext
  const { user, loading: authLoading } = useAuth();

  // Estado local para almacenar las órdenes del usuario
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true); // Control de carga de las órdenes

  useEffect(() => {
    // Si no hay usuario logueado, no intentamos cargar órdenes
    if (!user) {
      setLoading(false);
      return;
    }

    // Función asíncrona para cargar las órdenes desde Firebase
    const cargarOrdenes = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("buyer.email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        const resultados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrdenes(resultados); // Guardamos las órdenes en el estado local
      } catch (error) {
        console.error("Error cargando historial:", error);
      } finally {
        setLoading(false); // Indicamos que la carga terminó
      }
    };

    cargarOrdenes();
  }, [user]);

  // 🔹 Mostramos spinner mientras AuthContext o las órdenes cargan
  if (authLoading || loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // 🔹 Si no hay usuario logueado, mostramos mensaje
  if (!user) {
    return (
      <h3 className="text-center mt-5">
        Debes iniciar sesión para ver tu historial.
      </h3>
    );
  }

  // 🔹 Si no hay órdenes, indicamos que no hay compras
  if (ordenes.length === 0) {
    return (
      <h4 className="text-center mt-5 text-muted">
        No tienes compras registradas todavía.
      </h4>
    );
  }

  // 🔹 Renderizamos las órdenes del usuario
  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Historial de compras</h2>

      {ordenes.map((ord) => (
        <div key={ord.id} className="card shadow-sm mb-4">
          <div className="card-body">
            {/* Header de la orden */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title m-0">Orden #{ord.id}</h5>
              <span className="badge bg-secondary">{ord.date}</span>
            </div>

            <hr />

            {/* Items de la orden */}
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

            {/* Total de la orden */}
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

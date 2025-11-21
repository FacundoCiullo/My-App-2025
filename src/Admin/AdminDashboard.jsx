// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Table, Spinner, Accordion } from "react-bootstrap";

const AdminDashboard = () => {
  // 🔹 Obtenemos el usuario, bandera de admin y loading desde AuthContext
  const { user, esAdmin, loading: authLoading } = useAuth();

  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true); // carga de las órdenes

  useEffect(() => {
    const obtenerOrdenes = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      } finally {
        setCargando(false);
      }
    };

    // Solo cargamos órdenes si hay usuario logueado y es admin
    if (user && esAdmin) {
      obtenerOrdenes();
    } else {
      setCargando(false);
    }
  }, [user, esAdmin]);

  // 🔹 Spinner mientras AuthContext o las órdenes cargan
  if (authLoading || cargando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p>Cargando órdenes...</p>
      </div>
    );
  }

  // 🔹 Si no hay usuario logueado
  if (!user) {
    return <p className="text-center mt-5">⚠️ No estás logueado.</p>;
  }

  // 🔹 Si el usuario no es admin
  if (!esAdmin) {
    return (
      <p className="text-center mt-5">
        🚫 No tenés permisos para acceder a esta página.
      </p>
    );
  }

  // 🔹 Renderizado del dashboard
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h1>Panel de Administración</h1>
      </div>

      <p className="text-muted mb-4 d-flex justify-content-center align-items-center">
        Bienvenido, {user.displayName}
      </p>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden, index) => (
            <tr key={orden.id}>
              <td>{index + 1}</td>
              <td>{orden.date || "Sin fecha"}</td>
              <td>{orden.buyer?.name || "N/A"}</td>
              <td>{orden.buyer?.email || "N/A"}</td>
              <td>{orden.buyer?.phone || "N/A"}</td>
              <td>${orden.total?.toLocaleString("es-AR") || "0"}</td>
              <td>
                <Accordion>
                  <Accordion.Item eventKey={orden.id}>
                    <Accordion.Header>Ver detalle</Accordion.Header>
                    <Accordion.Body>
                      {orden.items?.length > 0 ? (
                        <ul className="mb-2 list-unstyled">
                          {orden.items.map((item) => (
                            <li
                              key={item.id}
                              className="d-flex justify-content-between align-items-center border-bottom py-2"
                            >
                              <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                                <span className="fw-bold">{item.title}</span>
                                <div className="d-flex gap-3 text-muted small">
                                  {item.color && <span>Color: {item.color}</span>}
                                  {item.talle && <span>Talle: {item.talle}</span>}
                                </div>
                              </div>

                              <div className="text-end">
                                x{item.quantity} — ${item.price * item.quantity}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Sin productos.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;

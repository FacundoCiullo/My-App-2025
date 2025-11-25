// src/pages/Favoritos.jsx
import React from "react";
import { useFavorites } from "../../context/FavoritesContext";


const Favoritos = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0)
    return (
      <div className="container text-center my-5">
        <h3>No tenés productos en favoritos</h3>
      </div>
    );

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Favoritos</h2>
      <div className="row g-4">
        {favorites.map((p) => (
          <div key={p.id} className="col-md-3">
            <div className="card h-100 shadow-sm">
              <img
                src={p.imagen}
                className="card-img-top"
                alt={p.titulo}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5>{p.titulo}</h5>
                <p className="text-muted">${p.precio}</p>
                <button
                  onClick={() => toggleFavorite(p)}
                  className="btn btn-outline-danger"
                >
                  Quitar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;
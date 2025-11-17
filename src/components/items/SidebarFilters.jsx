// src/components/items/SidebarFilters.jsx

import { useEffect, useMemo } from "react";
import "./sidebar.css";

const SidebarFilters = ({ productos, filtros, setFiltros }) => {

  // ------------------------------------------------------------
  // 1) Filtrar productos según categorías seleccionadas
  // ------------------------------------------------------------
  const productosFiltradosPorCategoria = useMemo(() => {
    if (!productos || productos.length === 0) return [];
    if (filtros.categorias.length === 0) return productos;

    return productos.filter((p) =>
      filtros.categorias.includes(p.categoria)
    );
  }, [productos, filtros.categorias]);

  // ------------------------------------------------------------
  // 2) Generar OPCIONES DINÁMICAS según los productos filtrados
  // ------------------------------------------------------------
  const opciones = useMemo(() => {
    if (productosFiltradosPorCategoria.length === 0) {
      return { cats: [], marcas: [], talles: [], colores: [], maxPrecio: 0 };
    }

    const cats = [...new Set(productos.map((p) => p.categoria).filter(Boolean))];

    const marcas = [
      ...new Set(productosFiltradosPorCategoria.map((p) => p.marca).filter(Boolean)),
    ];

    const talles = [
      ...new Set(
        productosFiltradosPorCategoria.flatMap((p) => p.talles || [])
      ),
    ];

    const colores = [
      ...new Set(
        productosFiltradosPorCategoria.flatMap((p) => p.colores || [])
      ),
    ];

    const maxPrecio = Math.max(
      ...productosFiltradosPorCategoria.map((p) => p.precio || 0),
      0
    );

    return { cats, marcas, talles, colores, maxPrecio };
  }, [productos, productosFiltradosPorCategoria]);

  // ------------------------------------------------------------
  // 3) Limpiar filtros inválidos cuando cambian las opciones
  // ------------------------------------------------------------
  useEffect(() => {
    setFiltros((prev) => ({
      ...prev,
      marcas: prev.marcas.filter((m) => opciones.marcas.includes(m)),
      talles: prev.talles.filter((t) => opciones.talles.includes(t)),
      colores: prev.colores.filter((c) => opciones.colores.includes(c)),
      precioMax: Math.min(prev.precioMax ?? opciones.maxPrecio, opciones.maxPrecio),
    }));
  }, [opciones, setFiltros]);

  // ------------------------------------------------------------
  // 4) Cambios en filtros por checkboxes
  // ------------------------------------------------------------
  const handleCheckbox = (type, value) => {
    setFiltros((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <aside className="sidebar-filtros shadow-sm">
      
      {/* ------------------------------------- */}
      {/* Categorías */}
      {/* ------------------------------------- */}
      <h5 className="filter-title">Categorías</h5>
      <div className="filter-grid">
        {opciones.cats.map((cat) => (
          <label key={cat} className="filter-option">
            <input
              type="checkbox"
              checked={filtros.categorias.includes(cat)}
              onChange={() => handleCheckbox("categorias", cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <hr />

      {/* ------------------------------------- */}
      {/* Marcas */}
      {/* ------------------------------------- */}
      <h5 className="filter-title">Marcas</h5>
      <div className="filter-grid">
        {opciones.marcas.length > 0 ? (
          opciones.marcas.map((m) => (
            <label key={m} className="filter-option">
              <input
                type="checkbox"
                checked={filtros.marcas.includes(m)}
                onChange={() => handleCheckbox("marcas", m)}
              />
              {m}
            </label>
          ))
        ) : (
          <p className="text-muted small">No disponible</p>
        )}
      </div>

      <hr />

      {/* ------------------------------------- */}
      {/* Talles */}
      {/* ------------------------------------- */}
      <h5 className="filter-title">Talles</h5>
      <div className="filter-grid">
        {opciones.talles.length > 0 ? (
          opciones.talles.map((t) => (
            <label key={t} className="filter-option">
              <input
                type="checkbox"
                checked={filtros.talles.includes(t)}
                onChange={() => handleCheckbox("talles", t)}
              />
              {t}
            </label>
          ))
        ) : (
          <p className="text-muted small">No disponible</p>
        )}
      </div>

      <hr />

      {/* ------------------------------------- */}
      {/* Colores */}
      {/* ------------------------------------- */}
      <h5 className="filter-title">Colores</h5>
      <div className="filter-grid">
        {opciones.colores.length > 0 ? (
          opciones.colores.map((c) => (
            <label key={c} className="filter-option">
              <input
                type="checkbox"
                checked={filtros.colores.includes(c)}
                onChange={() => handleCheckbox("colores", c)}
              />
              {c}
            </label>
          ))
        ) : (
          <p className="text-muted small">No disponible</p>
        )}
      </div>

      <hr />

      {/* ------------------------------------- */}
      {/* Precio */}
      {/* ------------------------------------- */}
      <h5 className="filter-title">Precio máximo: ${filtros.precioMax}</h5>
      <input
        type="range"
        min={0}
        max={opciones.maxPrecio}
        value={filtros.precioMax ?? opciones.maxPrecio}
        onChange={(e) =>
          setFiltros((prev) => ({
            ...prev,
            precioMax: Number(e.target.value),
          }))
        }
        className="form-range"
      />
    </aside>
  );
};

export default SidebarFilters;

//src/components/items/SidebarFilters.jsx

import { useEffect, useMemo, useRef } from "react";
import "./style/sidebar.css";
import { motion, AnimatePresence } from "framer-motion";

const SidebarFilters = ({ productos, filtros, setFiltros }) => {

  const prevCategoriasRef = useRef(filtros.categorias);

  // Filtrar productos por categorías seleccionadas
  const productosFiltradosPorCategoria = useMemo(() => {
    if (!productos || productos.length === 0) return [];
    if (filtros.categorias.length === 0) return productos;
    return productos.filter((p) => filtros.categorias.includes(p.categoria));
  }, [productos, filtros.categorias]);

  // Generar opciones dinámicas según productos filtrados
  const opciones = useMemo(() => {
    if (productosFiltradosPorCategoria.length === 0) {
      return { cats: [], marcas: [], talles: [], colores: [], maxPrecio: 0 };
    }

    const cats = [...new Set(productos.map((p) => p.categoria).filter(Boolean))];
    const marcas = [...new Set(productosFiltradosPorCategoria.map((p) => p.marca).filter(Boolean))];
    const talles = [...new Set(productosFiltradosPorCategoria.flatMap((p) => p.talles || []))];
    const colores = [...new Set(productosFiltradosPorCategoria.flatMap((p) => p.colores || []))];
    const maxPrecio = Math.max(...productosFiltradosPorCategoria.map((p) => p.precio || 0), 0);

    return { cats, marcas, talles, colores, maxPrecio };
  }, [productos, productosFiltradosPorCategoria]);

  // Inicializar precio máximo al cambiar categoría
  useEffect(() => {
    const maxPrecioActual = opciones.maxPrecio;

    // Detectar si la categoría cambió
    const categoriasCambiadas = prevCategoriasRef.current.join(",") !== filtros.categorias.join(",");
    if (categoriasCambiadas) {
      setFiltros((prev) => ({
        ...prev,
        marcas: prev.marcas.filter((m) => opciones.marcas.includes(m)),
        talles: prev.talles.filter((t) => opciones.talles.includes(t)),
        colores: prev.colores.filter((c) => opciones.colores.includes(c)),
        precioMax: maxPrecioActual, // inicializamos al maximo de la categoría seleccionada
      }));
      prevCategoriasRef.current = [...filtros.categorias];
    }
  }, [filtros.categorias, opciones, setFiltros]);

  // Manejar selección de filtros
  const handleCheckbox = (type, value) => {
    setFiltros((prev) => {
      const alreadySelected = prev[type].includes(value);
      if (alreadySelected) return { ...prev, [type]: [] };
      return { ...prev, [type]: [value] };
    });
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      categorias: [],
      marcas: [],
      talles: [],
      colores: [],
      precioMax: opciones.maxPrecio,
    });
  };

  return (
<aside className="sidebar-filtros shadow-sm pro-sidebar">

  <div className="sticky-wrapper">

      {/* Categorías */}
      <h5 className="filter-title">Categorías</h5>
      <div className="filter-grid">
        {opciones.cats.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${filtros.categorias.includes(cat) ? "selected" : ""}`}
            onClick={() => handleCheckbox("categorias", cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Marcas */}
      <AnimatePresence>
        {filtros.categorias.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <hr />
            <h5 className="filter-title">Marcas</h5>
            <div className="filter-grid">
              {opciones.marcas.length > 0 ? (
                opciones.marcas.map((m) => (
                  <button
                    key={m}
                    className={`pill-btn ${filtros.marcas.includes(m) ? "selected" : ""}`}
                    onClick={() => handleCheckbox("marcas", m)}
                  >
                    {m}
                  </button>
                ))
              ) : (
                <p className="text-muted small">No disponible</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Talles */}
      <AnimatePresence>
        {filtros.categorias.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <hr />
            <h5 className="filter-title">Talles</h5>
            <div className="filter-grid">
              {opciones.talles.length > 0 ? (
                opciones.talles.map((t) => (
                  <button
                    key={t}
                    className={`pill-btn ${filtros.talles.includes(t) ? "selected" : ""}`}
                    onClick={() => handleCheckbox("talles", t)}
                  >
                    {t}
                  </button>
                ))
              ) : (
                <p className="text-muted small">No disponible</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Colores */}
      <AnimatePresence>
        {filtros.categorias.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <hr />
            <h5 className="filter-title">Colores</h5>
            <div className="filter-grid color-grid">
              {opciones.colores.length > 0 ? (
                opciones.colores.map((c) => (
                  <label
                    key={c}
                    className={`color-option ${filtros.colores.includes(c) ? "selected" : ""}`}
                    onClick={() => handleCheckbox("colores", c)}
                  >
                    <span className="color-circle" style={{ backgroundColor: c }} />
                    <span className="color-name">{c}</span>
                  </label>
                ))
              ) : (
                <p className="text-muted small">No disponible</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <hr />

      {/* Precio */}
      <h5 className="filter-title filter-title-Precio">Precio máximo: ${filtros.precioMax}</h5>
      <input
        type="range"
        min={0}
        max={opciones.maxPrecio}
        value={filtros.precioMax ?? opciones.maxPrecio}
        onChange={(e) =>
          setFiltros((prev) => ({ ...prev, precioMax: Number(e.target.value) }))
        }
        className="form-range"
      />

      {/* Limpiar filtros */}
      <button className="btn-clear-filters" onClick={limpiarFiltros}>
        Limpiar filtros
      </button>
  </div>
    </aside>
  );
};

export default SidebarFilters;

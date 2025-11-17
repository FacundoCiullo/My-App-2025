// src/components/items/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import SidebarFilters from "./SidebarFilters";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query
} from "firebase/firestore";
import Loading from "../Loading";

const ItemListContainer = ({ limit }) => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [filtros, setFiltros] = useState({
    categorias: [],
    marcas: [],
    talles: [],
    colores: [],
    precioMax: 999999,
  });

  // --- CARGA DESDE FIRESTORE ---
  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");
    const q = id ? query(itemsCollection, where("categoria", "==", id)) : itemsCollection;

    getDocs(q).then(resultado => {
      if (resultado.size > 0) {
        const data = resultado.docs.map(producto => ({
          id: producto.id,
          ...producto.data(),
        }));
        setItems(data);
        setFiltered(data);
      } else {
        console.warn("No se encontraron productos en Firestore");
      }
      setLoading(false);
    });
  }, [id]);

  // --- APLICAR FILTROS ---
  useEffect(() => {
    let final = [...items];

    if (filtros.categorias.length)
      final = final.filter(item => filtros.categorias.includes(item.categoria));

    if (filtros.marcas.length)
      final = final.filter(item => filtros.marcas.includes(item.marca));

    if (filtros.talles.length)
      final = final.filter(item =>
        (item.talles || []).some(t => filtros.talles.includes(t))
      );

    if (filtros.colores.length)
      final = final.filter(item =>
        (item.colores || []).some(c => filtros.colores.includes(c))
      );

    final = final.filter(item => item.precio <= filtros.precioMax);

    setFiltered(limit ? final.slice(0, limit) : final);
  }, [filtros, items, limit]);

  if (loading) return <Loading />;

  return (
    <div className="container my-5">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-12 col-md-3 mb-4">
          <SidebarFilters
            productos={items}
            filtros={filtros}
            setFiltros={setFiltros}
          />
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div className="col-12 col-md-9">
          <ItemList
            productos={filtered}
            colorSeleccionado={filtros.colores[0] || null}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;

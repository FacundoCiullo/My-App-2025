import { useEffect, useState } from "react";
import ItemList from "./items/ItemList";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";

const Destacados = ({ limit = 8 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");

    getDocs(itemsCollection).then(resultado => {
      if (resultado.size > 0) {
        const productos = resultado.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Agrupar productos por categoría
        const porCategoria = {};
        productos.forEach(p => {
          if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
          porCategoria[p.categoria].push(p);
        });

        // Orden personalizado: 1 abrigo, 1 remera, 2 zapatillas, 1 pantalon, 1 abrigo, 1 remera
        const orden = [];
        const categoriasOrden = ["Abrigos", "Remeras", "Zapatillas", "Pantalon", "Zapatillas", "Pantalon", "Abrigos","Remeras"];
        categoriasOrden.forEach(cat => {
          if (porCategoria[cat] && porCategoria[cat].length > 0) {
            orden.push(porCategoria[cat].shift()); // tomar el primer producto de esa categoría
          }
        });

        setItems(orden.slice(0, limit));
      }
      setLoading(false);
    });
  }, [limit]);

  return (
    <div className="container my-5">
      <div className="row">
        {loading ? <Loading /> : <ItemList productos={items} />}
      </div>
    </div>
  );
};

export default Destacados;
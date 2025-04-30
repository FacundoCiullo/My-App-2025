import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import Loading from "./Loading";

const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const db = getFirestore();
    const producto = doc(db, "items", id);  // No muestra producto por id en firebase
    getDoc(producto).then(resultado => {
      if (resultado.exists()) {
        setItem ({id:resultado.id, ...resultado.data()  });
        setLoading(false)
    } else {
      console.log("Error! no hay producto")
    }
    });
  },[id]);

  return (
    <>
      {loading ? <Loading /> : <ItemDetail producto={item} />}
    </>
  )
}

export default ItemDetailContainer;

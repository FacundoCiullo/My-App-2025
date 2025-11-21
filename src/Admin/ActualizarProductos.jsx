import React from "react";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import productos from "../json/productos.json"; 
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCloudArrowDown} from "react-icons/bs";


const ActualizarProductos = () => {

  const actualizarFirestore = async () => {
    try {
      const coleccion = collection(db, "items"); // <-- Colección corregida

      for (const producto of productos) {
        // ID como string de 3 dígitos
        const idStr = String(producto.id).padStart(3, '0');

        const docRef = doc(coleccion, idStr);

        await setDoc(docRef, {
          ...producto,
          id: idStr
        });
      }

      toast.success("Productos actualizados correctamente ✅", { position: "top-center" });
    } catch (error) {
      console.error("Error al actualizar Firestore:", error);
      toast.error("Error al actualizar Firestore ❌", { position: "top-center" });
    }
  };

  return (
    <div className=" text-center">
      <Button                 
        variant="outline-secondary"
        onClick={actualizarFirestore}
        className="w-100" >

        <BsCloudArrowDown className="me-2" />Actualizar
      </Button>
      <ToastContainer />
    </div>
  );
};

export default ActualizarProductos;

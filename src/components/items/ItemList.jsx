// src/components/items/ItemList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";


import ItemQuickView from "./ItemQuickView";
import Item from "./Item";

const ItemList = ({ productos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  if (!productos || productos.length === 0) {
    return (
      <p className="text-center text-muted my-5">
        No hay productos disponibles.
      </p>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
        <motion.div
          className="items-container"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {productos.map((producto) => (
            <motion.div
              key={`${producto.id}-${producto.colorForzado || "default"}`}
              variants={itemVariants}
              className="item-wrapper"
            >
              <Item
                producto={producto}
                colorSeleccionado={producto.colorForzado || null}
                handleQuickView={handleQuickView}
              />
            </motion.div>
          ))}
        </motion.div>

      <ItemQuickView
        show={showModal}
        handleClose={() => setShowModal(false)}
        producto={selectedProduct}
      />
    </>
  );
};

export default ItemList;

// src/context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // addItem mantiene la firma original: (item, quantity)
  // item debe incluir: id, titulo, precio, imagen (ya resuelta según color), marca, color, talle
  const addItem = (item, quantity) => {
    // buscamos si existe exactamente el mismo id+color+talle
    const existingIndex = cart.findIndex(
      (p) => p.id === item.id && p.color === item.color && p.talle === item.talle
    );

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      setCart(updated);
    } else {
      // guardamos con el nombre 'quantity' para ser compatibles
      const newItem = {
        id: item.id,
        titulo: item.titulo,
        precio: item.precio,
        quantity,
        color: item.color || null,
        talle: item.talle || null,
        marca: item.marca || item.marca || "",
        imagen: item.imagen || item.imagen || item.image || "/img/no-image.png",
      };
      setCart([...cart, newItem]);
    }
  };

  // removeItem mantiene la firma original: (id, color, talle)
  const removeItem = (id, color, talle) => {
    setCart(
      cart.filter(
        (p) => !(p.id === id && p.color === color && p.talle === talle)
      )
    );
  };

  const clear = () => setCart([]);

  const cartTotal = () => cart.reduce((acc, it) => acc + (it.quantity || 0), 0);

  const sumTotal = () =>
    cart.reduce((acc, it) => acc + (it.quantity || 0) * (it.precio || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        cartTotal,
        sumTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

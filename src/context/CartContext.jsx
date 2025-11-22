// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* =========================================================
      LOAD CART FROM LOCALSTORAGE ON APP START
  ========================================================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (error) {
      console.error("Error leyendo el carrito desde localStorage:", error);
    }
  }, []);

  /* =========================================================
      SAVE CART TO LOCALSTORAGE EVERY TIME IT CHANGES
  ========================================================= */
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch (error) {
      console.error("Error guardando carrito en localStorage:", error);
    }
  }, [cart]);

  /* =========================================================
      ADD ITEM
      Firma original: (item, quantity)
      Combina ítems idénticos (id + color + talle)
  ========================================================= */
  const addItem = (item, quantity) => {
    const existingIndex = cart.findIndex(
      (p) =>
        p.id === item.id &&
        p.color === item.color &&
        p.talle === item.talle
    );

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      setCart(updated);
      return;
    }

    const newItem = {
      id: item.id,
      titulo: item.titulo,
      precio: item.precio,
      quantity,
      color: item.color || null,
      talle: item.talle || null,
      marca: item.marca || "",
      imagen: item.imagen || item.image || "/img/no-image.png",
    };

    setCart([...cart, newItem]);
  };

  /* =========================================================
      REMOVE ITEM
      Firma original: (id, color, talle)
  ========================================================= */
  const removeItem = (id, color, talle) => {
    setCart(
      cart.filter(
        (p) => !(p.id === id && p.color === color && p.talle === talle)
      )
    );
  };

  /* =========================================================
      CLEAR CART
  ========================================================= */
  const clear = () => setCart([]);

  /* =========================================================
      TOTAL ITEMS (cantidad total)
  ========================================================= */
  const cartTotal = () =>
    cart.reduce((acc, it) => acc + (it.quantity || 0), 0);

  /* =========================================================
      SUM TOTAL ($ total del carrito)
  ========================================================= */
  const sumTotal = () =>
    cart.reduce(
      (acc, it) => acc + (it.quantity || 0) * (it.precio || 0),
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        cartTotal,
        sumTotal,
        setCart, // opcional pero útil para funciones internas
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

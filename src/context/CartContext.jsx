import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    const existingIndex = cart.findIndex(
      (product) =>
        product.id === item.id &&
        product.color === item.color &&
        product.talle === item.talle
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (id, color, talle) => {
    const updatedCart = cart.filter(
      (product) =>
        !(
          product.id === id &&
          product.color === color &&
          product.talle === talle
        )
    );
    setCart(updatedCart);
  };

  const clear = () => setCart([]);

  const cartTotal = () =>
    cart.reduce((acum, item) => acum + item.quantity, 0);

  const sumTotal = () =>
    cart.reduce((acum, item) => acum + item.quantity * item.precio, 0);

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

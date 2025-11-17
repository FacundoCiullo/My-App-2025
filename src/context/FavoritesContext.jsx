// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // tu contexto de auth

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth(); // usuario logueado
  const [favorites, setFavorites] = useState([]);

  // 🔹 Cargar favoritos del usuario al iniciar sesión
  useEffect(() => {
    if (!user) {
      setFavorites([]); // limpiar si no hay usuario
    } else {
      const stored = localStorage.getItem(`favorites_${user.uid}`);
      if (stored) setFavorites(JSON.parse(stored));
      else setFavorites([]);
    }
  }, [user]);

  // 🔹 Guardar favoritos en localStorage según usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = (producto) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === producto.id)
        ? prev.filter((p) => p.id !== producto.id)
        : [...prev, producto]
    );
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

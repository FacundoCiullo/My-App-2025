import React from "react";
import FavoritesItemsList from "../components/user/FavoritesItemsList";

const Favorites = () => {
  return (
    <div className="Productos-container ">

      {/* 🔹 Mostramos el FavoritesItemsList */}
      <FavoritesItemsList />

    </div>
  );
};

export default Favorites;

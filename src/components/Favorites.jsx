import { useFavorites } from "../context/FavoritesContext";
import Item from "./items/Item";
import { Row } from "react-bootstrap";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0)
    return <p className="text-center mt-5">No tenés productos favoritos aún </p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Mis Favoritos </h2>
      <Row>
        {favorites.map((producto) => (
          <Item key={producto.id} producto={producto} />
        ))}
      </Row>
    </div>
  );
};

export default Favorites;

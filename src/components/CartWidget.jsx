import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { CartContext } from "./context/CartContext";
import { useContext } from "react";


const CartWidget = () => {
  const {cartTotal} = useContext(CartContext);

return (
  (cartTotal() > -1) ? 
    <Link to={"/cart"}>
      <Button className="btn btn-dark">
        <i className="bi bi-cart3"></i><Badge bg="danger">{cartTotal()}</Badge>
      </Button> 
    </Link> : ""
  ) 
}

export default CartWidget;



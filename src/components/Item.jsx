import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


const Item = ({ producto }) => {

  return (
    <Col 
    className="g-4"
    xs={12} sm={6} md={4} lg={3} 
    >
      <Card className="producto-detalles">
        <Card.Body>
          <Link to={"/item/" + producto.id} className="text-dark text-decoration-none">

            <Card.Img className="producto-imagen" variant="top" src={producto.imagen}/>

            <Card.Title className="producto-titulo">{producto.titulo}</Card.Title>

            <Card.Text>{producto.descripcion}</Card.Text>

            <Card.Text>{`Precio: ${ "$" + producto.precio}`}</Card.Text>
            
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Item;

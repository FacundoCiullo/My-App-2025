import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Destacado2 = () => {
  // Array de objetos con imagen de fondo y título para cada tarjeta
  const cardsData = [
    { backgroundImage: 'url("img/abrigos/05.jpg")', title: 'Camperas', categoryId: 'Abrigos' },
    { backgroundImage: 'url("img/remeras/01.jpg")', title: 'Remeras', categoryId: 'Remeras' },
    { backgroundImage: 'url("img/pantalones/01.jpg")', title: 'Pantalones', categoryId: 'Pantalon' },
    { backgroundImage: 'url("img/zapatillas/01.jpg")', title: 'Zapatillas', categoryId: 'Zapatillas' }
  ];

  return (
    <div className="card-category">
      {cardsData.map((card, index) => (
        <Link to={`/category/${card.categoryId}`} key={index} className="card-link">
          <Card className="text-dark card-product">
            <div className="card-background" style={{ backgroundImage: card.backgroundImage }}></div>
            <Card.ImgOverlay>
              <Card.Title>{card.title}</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Destacado2;
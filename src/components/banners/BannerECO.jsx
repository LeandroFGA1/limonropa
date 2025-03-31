import React from 'react';
import { Button, Card, CardBody } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const BannerECO = () => {
  return (
    <Card className="bg-main shadow-lg p-6 text-center  w-full mx-auto">
      <CardBody>
        <h2 className="text-2xl font-bold text-black/80">Tenemos un compromiso ético, sostenible y rentable con el reciclaje</h2>
        <p className="text-black/80 mt-2 text-lg">Descubre cómo ayudamos al planeta reutilizando prendas y promoviendo la moda responsable.</p>
        <Link to="/aboutus#nuestro-plan">
          <Button className="mt-4 bg-green-600 hover:bg-green-700 text-gray-100 text-xl px-6 py-2 rounded-lg shadow-md">
            Saber más
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}

export default BannerECO;

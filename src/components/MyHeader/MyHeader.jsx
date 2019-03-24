import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";


const MyHeader = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Emslie Test Deployment</h1>
          <p className="lead">The React frontend is deployed on Github Pages and the node backend is deployed on Heroku with a MongoDB</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default MyHeader;
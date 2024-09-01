import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const NotMovie = () => {
  return (
    <Container className="not-movie-container">
      <Row className="justify-content-center">
        <Col xs="12" md="8">
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h2" className="not-movie-heading">
                No Movies Found
              </CardTitle>
              <p className="not-movie-description">
                Sorry, we couldn't find any movies matching your search.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotMovie;

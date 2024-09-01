import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiveStarRating } from "../../components/starRating/StarRating";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const SMALL_IMG_COVER_BASE_URL = import.meta.env.VITE_SMALL_IMG_COVER_BASE_URL;
const BACKDROP_BASE_URL = import.meta.env.VITE_BACKDROP_BASE_URL;

const MovieInfo = () => {
  const location = useLocation();
  console.log(location); // {pathname: "/movie/550", search: "", hash: "", state: {…}, key: "1v3v7v"}
  const [data, setData] = useState({}); // {adult: false, backdrop_path: "/8YyJyj69jNBFGfNjQ4Zv6j1Tzlo.jpg", belongs_to_collection: null, budget: 63000000, genres: Array(3), …}
  const { state } = location;
  const rating = data.vote_average;

  useEffect(() => {
    setData(state);
  }, [state]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${BACKDROP_BASE_URL + data.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>
      <Container
        className="movie-container mt-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Row>
          <Col md="4" className="text-center">
            <Card>
              <img
                src={SMALL_IMG_COVER_BASE_URL + data.poster_path}
                alt={data.title}
              />
            </Card>
          </Col>
          <Col md="8">
            <Card
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                borderRadius: "15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <CardBody>
                <CardTitle tag="h1">{data.title}</CardTitle>
                <CardText>
                  <strong>Release Date:</strong> {data.release_date}
                </CardText>
                <CardText>
                  <strong>Overview:</strong> {data.overview}
                </CardText>
                <CardText>
                  <strong>Rating:</strong>
                  <div className="d-flex align-items-center">
                    <FiveStarRating rating={rating} />
                    <span style={{ marginLeft: "10px" }}>
                      {data.vote_average}
                    </span>
                  </div>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieInfo;

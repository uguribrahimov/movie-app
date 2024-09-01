import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card"; // `MovieCard` komponentini düzgün import edin
import axiosInstance from "../../api/axiosInstance"; // `axiosInstance`-ı import edin
import NotMovie from "../../components/notmovie/NotMovie";
import { Container, Row, Col } from "reactstrap"; // `reactstrap` istifadə edərək

export default function NowPlay() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search).get("search") || "";

  // Filmləri "now playing" yoldan alırıq
  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get("/movie/now_playing");
      setData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Axtarış parametri əsasında filtrləyirik
    const filteredMovies = data.filter((movie) =>
      movie.title.toLowerCase().includes(params.toLowerCase())
    );
    setFilteredData(filteredMovies);
  }, [params, data]);

  const handleCardClick = (cardData) => {
    navigate(`/movie/${cardData.id}`, { state: cardData });
  };

  return (
    <Container className="mt-4">
      <Row>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Col key={index} xs="6" md="4" lg="3" className="mb-4">
              <Card sendData={handleCardClick} data={item} />
            </Col>
          ))
        ) : (
          <Col className="d-flex justify-content-center">
            <NotMovie />
          </Col>
        )}
      </Row>
    </Container>
  );
}

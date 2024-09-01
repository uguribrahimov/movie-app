import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card"; // `Card` komponentini düzgün import edin
import axiosInstance from "../../api/axiosInstance"; // `axiosInstance` import edin
import NotMovie from "../../components/notmovie/NotMovie";
import { Container, Row, Col, Spinner } from "reactstrap"; // `reactstrap` istifadə edərək

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Yüklenmə vəziyyəti
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search).get("search") || "";

  // Filmləri "popular" yoldan alırıq
  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get("/movie/popular"); // Burada `axiosInstance.get` istifadə edirik

      setData(response.data.results); // `results`-ı state-ə əlavə edirik
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false); // Yüklenmə tamamlandıqdan sonra
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Axtarış parametri əsasında filtr edirik
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
      {loading ? ( // Yüklenmə vəziyyətini yoxlayırıq
        <div className="d-flex justify-content-center">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      ) : (
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
      )}
    </Container>
  );
}

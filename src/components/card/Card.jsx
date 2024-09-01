import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import { FiveStarRating } from "../starRating/StarRating";
import styles from "./MovieCard.module.css"; // CSS modulunu import edirik

const SMALL_IMG_COVER_BASE_URL = import.meta.env.VITE_SMALL_IMG_COVER_BASE_URL;

const MovieCard = ({ data, sendData }) => {
  const handleClick = () => {
    sendData(data);
  };

  const rating = data.vote_average;

  return (
    <Card onClick={handleClick} className={styles.card}>
      <CardImg
        top
        width="100%"
        src={SMALL_IMG_COVER_BASE_URL + data.poster_path}
        alt={data.title}
        className={styles["card-img"]}
      />
      <CardBody style={{ marginTop: "15px", height: "30%" }}>
        <CardTitle tag="h5" style={{ fontSize: "16px" }}>
          {data.title}
        </CardTitle>
        <CardText>{data.release_date}</CardText>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FiveStarRating rating={rating} style={{ color: "#ffd700" }} />
          <span style={{ marginLeft: "5px" }}>{data.vote_average}</span>{" "}
          {/* Oy ortalaması */}
        </div>
      </CardBody>
    </Card>
  );
};

export default MovieCard;

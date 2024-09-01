import React from "react";
import { Star as StarEmpty, StarFill, StarHalf } from "react-bootstrap-icons";
import { Row, Col } from "reactstrap";

export function FiveStarRating({ rating }) {
  const starList = [];
  const starFilledCount = Math.floor(rating);
  const isStarHalf = rating % 1 !== 0; // İndiki reytinq tam ədəd deyilsə yarım ulduz var
  const starEmptyCount = 5 - starFilledCount - (isStarHalf ? 1 : 0);

  // Doldurulmuş ulduz ikonlarını əlavə et
  for (let i = 0; i < starFilledCount; i++) {
    starList.push(
      <StarFill key={"star-fill" + i} style={{ color: "yellow" }} />
    );
  }

  // Yarım ulduzu əlavə et
  if (isStarHalf) {
    starList.push(<StarHalf key="star-half" style={{ color: "yellow" }} />);
  }

  // Boş ulduzları əlavə et
  for (let i = 0; i < starEmptyCount; i++) {
    starList.push(
      <StarEmpty key={"star-empty" + i} style={{ color: "lightgray" }} />
    );
  }

  return (
    <Row>
      <Col
        className="d-flex justify-content-center"
        style={{ fontSize: "1.5rem" }}
      >
        {starList}
      </Col>
    </Row>
  );
}

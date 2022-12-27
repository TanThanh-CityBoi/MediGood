import React from "react";
import "./SliderComponent.scss";
import { Carousel, Container, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SliderComponent({ slides }) {
  const navigate = useNavigate();
  return (
    <Row className="slider">
      <Carousel fade>
        {slides.map((slide, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className={
                  !(slides.title && slide.description && slides.path)
                    ? "d-block w-100 light-img"
                    : "d-block w-100"
                }
                src={
                  slide.imgURL ||
                  "https://res.cloudinary.com/tanthanh0805/image/upload/v1645174210/LuxyWine/best-online-wine-shops-FT-MAG1019_i07qkl.jpg"
                }
                alt="First slide"
              />
              <Carousel.Caption>
                <div className="carousel-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  {slide.path && slide.path != "" && (
                    <Button
                      onClick={() => {
                        navigate(slide.path);
                      }}
                      variant="light"
                    >
                      XEM NGAY
                    </Button>
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Row>
  );
}

export default SliderComponent;

import React from "react";
import Slider from "react-slick";
import "./Pokemon.css";
import { dataDigitalBestSeller } from "./PokemonImages/pokemonData";
import { useState } from "react";
import Goku from "./DRAGON-BALL-Z-KAKAROT.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function CarouselPokemon() {
  const [defaultImage, setDefaultImage] = useState({});

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: Goku,
    }));
  };

  return (
    <Slider {...settings}>
      {dataDigitalBestSeller.map((item) => (
        <div className="card">
          <div className="card-top">
            <img
              src={
                defaultImage[item.title] === item.title
                  ? defaultImage.linkDefault
                  : item.linkImg
              }
              alt={item.title}
              onError={handleErrorImage}
            />
            <h1>{item.title}</h1>
          </div>
          <div className="card-bottom">
            <h3>{item.price}</h3>
            <span className="category">{item.category}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselPokemon;

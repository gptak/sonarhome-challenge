import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlickSlider({ links }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {links.map((link, index) => {
        return (
          <div key={index}>
            <img src={link} alt="launch" />
          </div>
        );
      })}
    </Slider>
  );
}

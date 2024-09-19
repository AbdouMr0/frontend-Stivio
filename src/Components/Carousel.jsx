import React from 'react';
import './carousel.css'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './Images/Stivio Pictures.jpg';
import image2 from './Images/imageHome3.jpg';
import image3 from './Images/Stivio2.png';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
const BootstrapCarousel = () => {
  return (
    <Carousel controls indicators>
      <Carousel.Item>
        <img
          className="image-home d-block mx-auto"
          src={image3}
          alt="First slide"
        />
        <Carousel.Caption>
        <Link className='link-see' to="products">See all products<span><IoArrowBack className='see-icon'></IoArrowBack> </span></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="image-home d-block mx-auto"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
        <Link className='link-see' to="products">See all products<span><IoArrowBack className='see-icon'></IoArrowBack> </span></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="image-home d-block mx-auto"
          src={image1}
          alt="Third slide"
        />
        <Carousel.Caption>
        <Link className='link-see' to="products">See all products<span><IoArrowBack className='see-icon'></IoArrowBack> </span></Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BootstrapCarousel;

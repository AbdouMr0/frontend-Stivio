import React from "react";
import "./home.css";
import NavBra from "./NavBra";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import ImageJeans from "./Images/ImageJeans.jpg";
import ImageTshirts from "./Images/Image Tshirts.jpg";
import ImageShoes from "./Images/ImageShoes.jpg";
import ImageJackets from "./Images/ImageJackets.jpg";
import ImageTracksuit from "./Images/ImageTracksuit.jpg";

const Home = () => {
  return (
    <div>
      <div className="body-home">
        <NavBra />
        {/* <img className='Image' src={HomeImage} alt="ImageHome" />
        <div className='parent-link-see'>
          <Link className='link-see' to="products">See all products<span><IoArrowBack className='see-icon'></IoArrowBack></span></Link>
        </div> */}
        <Carousel />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 pt-20">
        <div>
          <Link to="/products?category=Jeans">
            <img
              className="w-83 m-1 h-100 p-3 shadow-lg rounded"
              src={ImageJeans}
              alt="Jeans Image"
            />
<h4 className="catclthes relative bottom-[100px] left-[120px] font-serif text-2xl text-white ">
  <p className="categoryHome">Jeans</p>
</h4>
          </Link>
        </div>
        <div>
          <Link to="/products?category=T-Shirt">
            <img
              className="w-83 m-1 h-100 p-3 shadow-lg rounded"
              src={ImageTshirts}
              alt="T-Shirts Image"
            />
            <h4 className="catclthes relative bottom-[100px] left-[120px] font-serif text-2xl text-white ">
            <p>Tshirt</p>
          </h4>
          </Link>
        </div>
        <div>
          <Link to="/products?category=Jackets">
            <img
              className="w-83 m-1 h-100 p-3 shadow-lg rounded"
              src={ImageJackets}
              alt="Jackets Image"
            />
            <h4 className="catclothesJackets relative bottom-[100px] left-[120px] font-serif text-2xl text-white ">
            <p>Jackets</p>
          </h4>
          </Link>
        </div>
        <div>
          <Link to="/products?category=Tracksuit">
            <img
              className="w-83 m-1 h-100 p-3 shadow-lg rounded"
              src={ImageTracksuit}
              alt="Tracksuits Image"
            />
              <h4 className="catclothesTracksuit relative bottom-[100px] left-[100px] font-serif text-2xl text-white ">
            <p>Tracksuit</p>
          </h4>
          </Link>
          
        </div>
        <div>
          <Link to="/products?category=Shoes">
            <img
              className="w-83 m-1 h-100 p-3 shadow-lg rounded"
              src={ImageShoes}
              alt="Shoes Image"
            />
            <h4 className="catclthes relative bottom-[100px] left-[120px] font-serif text-2xl text-white ">
            <p>Shoes</p>
          </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { BiSolidCartAdd } from "react-icons/bi";
import NavBra from "./NavBra";
import Modal from "./Modal";
import { useCart } from "./CartContext"; // Import CartContext
import { IoArrowBackSharp } from "react-icons/io5";

const DetailsProduct = () => {
  const { id } = useParams();
  const [detailClothe, setDetailClothe] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const available_sizes = detailClothe.available_sizes;
  const { addToCart } = useCart(); // Use addToCart function

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/clotheswebsite/products/${id}/`
        );
        setDetailClothe(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Function to handle adding product to the cart
  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        image_url: detailClothe.image_url,
        name: detailClothe.name,
        description: detailClothe.description,
        selectedSize: selectedSize,
        price: detailClothe.price,
      });
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Please select a size."); // Alert if no size is selected
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <RotatingLines
          className="w-16 h-16"
          strokeColor="grey"
          strokeWidth="7"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Error, please try again!
      </div>
    );

  return (
    <>
      <NavBra />
      <div className="pt-10">
        <div className="flex max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
          <div className="flex-shrink-0 w-1/2 max-w-sm">
            <Link to="/products">
              <IoArrowBackSharp className="text-white bg-black text-2xl rounded" />
            </Link>
            <img
              src={`http://localhost:8000${detailClothe.image_url}`}
              alt={detailClothe.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 ml-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-300 rounded text-center pb-2 pt-3">
              {detailClothe.name}
            </h1>
            <p className="text-gray-700 mb-4 text-xl">
              <span className="underline decoration-double font-semibold text-2xl font-serif">
                Description :
              </span>
              <p> {detailClothe.description}</p>
            </p>
            <div className="mb-4">
              <h4 className="mb-3 font-medium font-serif">Select your size:</h4>
              {available_sizes.split(",").map((letter, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(letter)}
                  className={`border-2 p-2 mb-3 mx-2 rounded transition-colors duration-300 ${
                    selectedSize === letter
                      ? "bg-gray-300 text-gray-700 ml-3"
                      : "bg-white text-gray-600 hover:bg-gray-200 ml-3"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-4 rounded border-double border-4 border-gray-400 h-10 w-full sm:h-12 sm:w-auto pt-1 text-center">
              <span className="font-serif">Category: </span>
              <span className="text-gray-600">{detailClothe.category}</span>
            </p>

            <p className="text-xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-gray-400 to-gray-200 rounded p-2">
              Price: {detailClothe.price}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleAddToCart}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white-500 focus:ring-opacity-50 flex items-center"
              >
                Add to Cart
                <BiSolidCartAdd className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DetailsProduct;

import React from "react";
import { useCart } from "./CartContext"; // Import CartContext to access cart data
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart(); // Get cart items and removeFromCart function from context

  if (!isOpen) return null; // If modal is not open, render nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full h-1/2 flex flex-col p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-3xl flex justify-center font-bold mb-4">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty</p>
        ) : (
          <div className="overflow-y-auto">
            {cart.map((product) => (
              <div
                key={product.id} // Use product.id as the key
                className="flex mb-4 p-2 border-b border-gray-300"
              >
                <img
                  src={`http://localhost:8000${product.image_url}`}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-lg font-bold">
                    Size: {product.selectedSize}
                  </p>
                  <p className="text-lg font-bold">Price: {product.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(product.name)} // Call removeFromCart with the correct product id
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Continue Shopping
          </button>
          {cart.length !== 0 ?
         (<Link to="/order">
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600">
            Order
          </button>
        </Link> ) :<p></p>
       }
        </div>
      </div>
    </div>
  );
};

export default Modal;

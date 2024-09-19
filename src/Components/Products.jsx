import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation  } from "react-router-dom";
import NavBra from "./NavBra";
import "./Products.css";
import { RotatingLines } from "react-loader-spinner";
import SelectCategories from "./SelectCtegories"; // Ensure correct import name

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Fixed typo here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Add this to read the URL



  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/clotheswebsite/products/");
        setProducts(response.data);
        const params = new URLSearchParams(location.search);
        const categoryFromParams = params.get('category');
        if (categoryFromParams) {
          setSelectedCategory(categoryFromParams);
        }      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Navigate to product details page
  const toDetailProduct = (id) => {
    navigate(`/products/${id}`);
  };

  // Display loading spinner while fetching data
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <RotatingLines
        className='w-16 h-16'
        strokeColor="grey"
        strokeWidth="7"
        animationDuration="0.75"
        width="100"
        visible={true}
      />
    </div>
  );

  // Display error message if there is an error
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <NavBra />
      <div className="div-select position-absolute">
        <SelectCategories selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      </div>
      {/* Card of Products */}
      <div className="product-list mt-20">
        <div className="border-solid shadow-2xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              onClick={() => toDetailProduct(product.id)}
              key={product.id}
              className="border-solid border-2 border-gray-400 mx-1 mt-6 shadow-xl flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
            >
              <a>
                <img
                  className="rounded-t-lg w-full"
                  src={`http://localhost:8000${product.image_url}`}
                  alt={product.name}
                />
              </a>
              <hr />
              <div className="pt-1 ps-2 bg-gradient-to-br from-gray-100 to-gray-300 rounded-r-lg w-75">
                <h5 className="font-mono text-2xl font-bold text-gray-800">{product.name}</h5>
              </div>
              <div className="flex items-center space-x-2">
                <span className="pl-2 category font-sans text-gray-800">Category:</span>
                <p className="mt-3 text-xl font-serif text-gray-600">{product.category}</p>
              </div>
              <div className="flex items-center space-x-2  ">
                <span className="pl-2 category font-sans text-gray-800">Price:</span>
                <p className="mt-3 text-l font-serif text-gray-600 ">{product.price}DA</p>
                </div>
            </div>
          ))}
        </div>
        {/* End Card of Products */}
      </div>
    </div>
  );
};

export default Products;

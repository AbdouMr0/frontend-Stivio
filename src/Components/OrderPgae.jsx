import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useCart } from "./CartContext"; // Import CartContext to access cart data
import OptionWilaya from "./OptionWilaya";
import NavBra from "./NavBra";
import DilevryImage from "./Images/Dilevry.png";
import { GrStatusGood } from "react-icons/gr";

const OrderPage = () => {
  const { cart, removeFromCart } = useCart(); // Get cart items and removeFromCart function from context

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "0.00";
  };

  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [successOrder, setSuccessOrder] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleWilayaChange = (newWilaya) => {
    setSelectedWilaya(newWilaya);
  };

  const getDeliveryPrice = (wilaya) => {
    const wilayaList400 = [
      "الجزائر العاصمة",
      "بومرداس",
      "البليدة",
      "تيبازة",
      "تيزي وزو",
      "البويرة",
      "المدية",
    ];
    const wilayaList450 = [
      "الطارف",
      "قالمة",
      "خنشلة",
      "سعيدة",
      "سوق أهراس",
      "تبسة",
      "تيارت",
    ];
    const wilayaList800 = ["بسكرة", "أولاد جلال", "خنشلة", "الجلفة", "الأغواط"];
    const wilayaList900 = [
      "بشار",
      "تقرت",
      "البيض",
      "الوادي",
      "غرداية",
      "المنيعة",
      "ورقلة",
    ];
    const wilayaList500 = [
      "بجاية",
      "جيجل",
      "برج بوعريريج",
      "عين الدفلى",
      "عين تيموشنت",
      "عنابة",
      "باتنة",
      "الشلف",
      "قسنطينة",
      "سكيكدة",
      "سطيف",
      "تلمسان",
      "سيدي بلعباس",
      "غليزان",
      "أم البواقي",
      "ميلة",
      "مستغانم",
      "تيسمسيلت",
      "خنشلة",
    ];

    if (wilayaList400.includes(wilaya)) return 400;
    if (wilayaList450.includes(wilaya)) return 450;
    if (wilayaList800.includes(wilaya)) return 800;
    if (wilayaList900.includes(wilaya)) return 900;
    if (wilayaList500.includes(wilaya)) return 500; // Delivery price for additional wilayas
    return 0; // Default delivery price
  };

  const deliveryPrice = getDeliveryPrice(selectedWilaya);
  const cartTotal = cart.reduce(
    (total, product) => total + (Number(product.price) || 0),
    0
  );
  const totalPrice = deliveryPrice + cartTotal;

  const handleOrderSubmit = async () => {
    const orderData = {
      name,
      phoneNumber,
      streetAddress,
      wilaya: selectedWilaya,
      cartItems: cart,
      deliveryPrice,
      cartTotal,
      totalPrice,
    };

    try {
      setLoadingOrder(true);
      const response = await axios.post(
        "https://backend-stivio.onrender.com/clotheswebsite/order/",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessOrder(true);
        setLoadingOrder(false);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavBra />
      <div className="pt-5 shadow">
        {successOrder ? (
          <div className="flex justify-center rounded-lg shadow">
            <img
              src={DilevryImage}
              alt="dilevry"
              className="siz-16 h-50 w-50"
            />
            <p className="text-4xl text-gray-600 pt-5 absolute">
              Your order has been success <span></span>{" "}
            </p>
            <GrStatusGood className="absolute text-gray-600 text-3xl top-[240px]" />
          </div>
        ) : (
          <div className="p-6 pt-5 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-4xl font-bold mb-4 flex justify-center underline mb-5">
              Order Details
            </h2>
            <div className="grid gap-4 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <OptionWilaya onWilayaChange={handleWilayaChange} />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Your Order</h3>
            <div className="overflow-x-auto">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="flex mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                >
                  <img
                    src={`https://backend-stivio.onrender.com${product.image_url}`}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-600 mb-1">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      Size: {product.selectedSize}
                    </p>
                    <p className="text-lg font-bold">
                      Price: {formatPrice(product.price)} DA
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.name)}
                    className="self-start ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border-t border-gray-300">
              <h3 className="text-2xl font-semibold mb-2">Invoice:</h3>
              <div className="pl-5 text-lg">
                <p className="text-gray-700">
                  <strong>Wilaya:</strong> {selectedWilaya}
                </p>
                <p className="text-gray-700">
                  <strong>Cart Total:</strong> {formatPrice(cartTotal)} DA
                </p>
                <p className="text-gray-700">
                  <strong>Delivery Price:</strong> {deliveryPrice} DA
                </p>
                <p className="text-gray-900 font-bold">
                  <strong>Total Price:</strong> {formatPrice(totalPrice)} DA
                </p>
              </div>
            </div>
            {loadingOrder ? (
              <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Sending Order ....
              </button>
            ) : (
              <button
                onClick={handleOrderSubmit}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Place Order
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;

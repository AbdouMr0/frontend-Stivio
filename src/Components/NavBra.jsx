import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Image from "./Images/Stivio2.png";
import "./NavBra.css";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import Modal from './Modal'; // Import the Modal component
import { useCart } from "./CartContext"; // Import CartContext to access cart data

const NavBra = () => {
    const [clicked, setClicked] = useState(false); // Using useState for clicked state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cart } = useCart(); // Ensure the context provides this value

    const handleClick = () => {
        setClicked(!clicked); // Toggle clicked state
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="menu-icons" onClick={handleClick}>
                        {clicked ? <IoCloseSharp /> : <TiThMenu />}
                    </div>
                    <div>
                        <div className="m-2">
                            <Link className="navbar-brand" to="/">
                                <span>Home</span>
                            </Link>
                            <Link className="navbar-brand" to="/products">
                                Products
                            </Link>
                            <Link className="navbar-brand" to="/contact">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img className="ImgStv" src={Image} alt="Logo" />
                    </div>
                    <div className="d-flex flex-row m-3 text-xl">
                        <Link onClick={handleOpenModal} className="text-body-emphasis">
                            <FaShoppingCart />
                        </Link>
                            {cart.length}
                    </div>
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
            </nav>
            <div className="div-nav-menu bg-body-tertiary">
                <div className={clicked ? "nav-menu" : "nav"}>
                    <Link className="Links" to="/">
                        Home
                    </Link>
                    <Link className="Links" to="/products">
                        Products
                    </Link>
                    <Link className="Links" to="/contact">
                        Contact
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBra;

// src/components/layout/MobileNavbar.jsx

import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { LuBoxes } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

import MobileSidebar from "./MobileSidebar";
import "./style/MobileNavbar.css";

const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const [user] = useAuthState(auth);
  const [showSidebar, setShowSidebar] = useState(false);

  // 👉 Importamos cartTotal()
  const { cartTotal } = useContext(CartContext);
  const totalCarrito = cartTotal();

  return (
    <>
      <nav className="mobile-nav d-md-none">

        {/* Home */}
        <Link to="/Home" className={path === "/Home" ? "active" : ""}>
          {path === "/Home" ? <AiFillHome size={24} /> : <AiOutlineHome size={24} />}
        </Link>

        {/* Favoritos */}
        <Link to="/favoritos" className={path === "/favoritos" ? "active" : ""}>
          {path === "/favoritos" ? <BsHeartFill size={22} /> : <BsHeart size={22} />}
        </Link>

        {/* Productos */}
        <Link to="/Productos" className={path === "/Productos" ? "active" : ""}>
          <LuBoxes size={28} />
        </Link>

        {/* Carrito con burbuja */}
        <div className="cart-icon-wrapper">
          {totalCarrito > 0 && (
            <span className="cart-badge flex-end">{totalCarrito}</span>
          )}
          <Link to="/cart" className={path === "/cart" ? "active" : ""}>
            {path === "/cart" ? (
              <RiShoppingCart2Fill size={28} />
            ) : (
              <RiShoppingCart2Line size={28} />
            )}
          </Link>


        </div>

        {/* Avatar abre sidebar */}
        <button className="mobile-avatar-btn" onClick={() => setShowSidebar(!showSidebar)}>
          {user ? (
            <img
              src={user.photoURL}
              alt="user"
              className="mobile-avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUserCircle size={24} />
          )}
        </button>

      </nav>

      {/* Sidebar */}
      <MobileSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        user={user}
      />
    </>
  );
};

export default MobileNavbar;

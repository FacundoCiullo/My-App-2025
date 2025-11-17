import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ActualizarProductos from "../components/ActualizarProductos";
import CartWidget from "./CartWidget";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BsBoxes,
  BsHouseFill,
  BsBoxSeamFill,
  BsTelephoneFill,
  BsCartCheckFill,
  BsBookmarkStarFill,
} from "react-icons/bs";
import { FaUserCircle, FaBook, FaSignOutAlt, FaCog, FaGoogle } from "react-icons/fa";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user] = useAuthState(auth);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const adminEmail = "facundonahuel.ciullo@gmail.com";
  const esAdmin = user?.email === adminEmail;

  return (
    <>
      {/* 🔹 ESTILOS DE NAVBAR + SIDEBAR */}
      <style>
        {`
          /* ---- Subrayado del NAVBAR ---- */
          .nav-underline {
            position: relative;
            padding-bottom: 2px;
          }

          .nav-underline::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0%;
            height: 2px;
            background-color: white;
            transition: width 0.25s ease;
          }

          .nav-underline:hover::after {
            width: 100%;
          }

          /* ---- Subrayado del SIDEBAR ---- */
          .sidebar-link {
            display: flex;
            align-items: center;
            color: white;
            text-decoration: none;
            padding: 8px 0;
            position: relative;
          }

          .sidebar-link::after {
            content: "";
            position: absolute;
            left: 32px; /* deja el ícono afuera del subrayado */
            bottom: 0;
            width: 0%;
            height: 2px;
            background-color: white;
            transition: width 0.25s ease;
          }

          .sidebar-link:hover::after {
            width: calc(100% - 32px);
          }
        `}
      </style>

      {/* 🔹 NAVBAR PRINCIPAL */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className="shadow-sm px-4 py-2 border-bottom border-secondary"
        style={{ fontWeight: 500, letterSpacing: "5px" }}
      >
        <div className="d-flex align-items-center justify-content-center gap-4 w-100">

          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <BsBoxes size={28} className="me-2" />
          </Navbar.Brand>

          {/* Links centrados */}
          <Nav className="d-none d-lg-flex align-items-center gap-3">
            <Nav.Link
              as={Link}
              to="/Home"
              className="nav-underline text-white fw-light fs-6"
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Productos"
              className="nav-underline text-white fw-light fs-6"
            >
              Productos
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Contactos"
              className="nav-underline text-white fw-light fs-6"
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* Carrito */}
          <CartWidget />

          {/* Avatar */}
          <Button
            variant="link"
            onClick={() => setShowMenu(true)}
            className="p-0 border-0"
          >
            {user ? (
              <img
                src={user.photoURL}
                alt="usuario"
                referrerPolicy="no-referrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #666",
                }}
              />
            ) : (
              <FaUserCircle size={28} color="white" />
            )}
          </Button>

        </div>
      </Navbar>

      {/* 🔸 SIDEBAR */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
        className="bg-dark text-light"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Mi cuenta</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>

          {user ? (
            <>
              {/* Perfil */}
              <div className="text-center mb-3">
                <img
                  src={user.photoURL}
                  alt="usuario"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    objectFit: "cover",
                    border: "2px solid #666",
                  }}
                />
                <h6 className="mt-2">{user.displayName}</h6>
                <p className="text-secondary small">{user.email}</p>
              </div>

              <hr className="border-secondary" />

              {/* ---- LINKS DEL SIDEBAR ---- */}
              <Link
                to="/Home"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <BsHouseFill className="me-2" /> Inicio
              </Link>

              <Link
                to="/Productos"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <BsBoxSeamFill className="me-2" /> Productos
              </Link>

              <Link
                to="/Contactos"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <BsTelephoneFill className="me-2" /> Contactos
              </Link>

              <hr className="border-secondary" />

              <Link
                to="/cart"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <BsCartCheckFill className="me-2" /> Carrito
              </Link>

              <Link
                to="/favoritos"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <BsBookmarkStarFill className="me-2" /> Favoritos
              </Link>

              <Link
                to="/historial"
                onClick={() => setShowMenu(false)}
                className="sidebar-link"
              >
                <FaBook className="me-2" /> Historial de compras
              </Link>

              {/* ADMIN */}
              {esAdmin && (
                <>
                  <hr className="border-secondary" />

                  <Link
                    to="/admin"
                    onClick={() => setShowMenu(false)}
                    className="sidebar-link"
                  >
                    <FaCog className="me-2" /> Panel de administración
                  </Link>

                  <div className="mt-3">
                    <ActualizarProductos />
                  </div>
                </>
              )}

              <hr className="border-secondary" />

              <Button
                variant="outline-secondary"
                onClick={handleLogout}
                className="w-100"
              >
                <FaSignOutAlt className="me-2" /> Cerrar sesión
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p>Iniciá sesión para ver tus datos.</p>

              <Button
                variant="outline-light"
                onClick={handleLogin}
                className="d-flex align-items-center justify-content-center mx-auto"
              >
                <FaGoogle className="me-2" /> Iniciar sesión con Google
              </Button>
            </div>
          )}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
